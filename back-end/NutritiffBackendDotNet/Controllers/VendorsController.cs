using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackendDotNet.Models;

namespace NutritiffBackendDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorsController : ControllerBase
    {
        private readonly NutritiffContext _context;

        public VendorsController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        //To login the vendor
        [HttpPost("login")]
        public ActionResult<Vendor> Login([FromBody] VendorBody vendor)
        {
            var activeVendor = _context.Vendors.FirstOrDefault(
                v => v.Email == vendor.Email && v.Password == vendor.Password && v.ActiveStatus == "active");
            if (activeVendor != null)
            {
                return new ActionResult<Vendor>(activeVendor);
            }
            else
            {
                return NotFound();
            }
        }

        //2
        //To register the vendor
        [HttpPost("register")]
        public ActionResult<Vendor> Register([FromBody] Vendor vendor)
        {
            _context.Vendors.Add(vendor);
            _context.SaveChanges();
            return new ActionResult<Vendor>(vendor);
        }

        //3
        //To display the the tiffins ordered by the customer
        [HttpPost("myorders")]
        public IEnumerable<ShowOrder> ShowMyOrders([FromBody] int vendorId)
        {
            var query = from vendor in _context.Vendors
                        join tiffin in _context.Tiffins on vendor.VendorId equals tiffin.VendorId
                        join tiffinOrderItem in _context.OrderItems on tiffin.TiffinId equals tiffinOrderItem.TiffinId
                        join order in _context.Orders on tiffinOrderItem.OrderId equals order.OrderId
                        join customer in _context.Customers on order.CustomerId equals customer.CustomerId
                        where vendor.VendorId == vendorId && order.Status == "ordered"
                        select new ShowOrder
                        {
                            orderId = order.OrderId,
                            customerName = customer.Name,
                            customerHomeAddress = customer.HomeAddress,
                            customerWorkAddress = customer.WorkAddress,
                            vendorName = vendor.Name,
                            tiffinName = tiffin.TiffinName,
                            quantity = tiffinOrderItem.Quantity
                        };

            var results = query.ToList();
            return results;
        }

        //4
        //To display vendor's tiffins
        [HttpGet("mytiffins")]
        public IEnumerable<Tiffin> ShowMyTiffins(int vendorId)
        {
            var mytiffins = _context.Tiffins.Where(
                t => t.VendorId == vendorId).ToList();
            return mytiffins;
        }

        //5
        //To add new tiffin
        [HttpPost("addtiffin")]
        public ActionResult<Tiffin> AddTiffin([FromBody] Tiffin tiffin)
        {
            _context.Tiffins.Add(tiffin);
            _context.SaveChanges();
            return new ActionResult<Tiffin>(tiffin);
        }

        //6
        //To get the tiffin details by tiffinId
        [HttpPost("gettiffin")]
        public ActionResult<Tiffin> GetTffinById([FromBody] int tiffinId)
        {
            var tiffin = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if (tiffin != null)
            {
                return new ActionResult<Tiffin>(tiffin);
            }
            else { return NotFound(); }
        }

        //7
        //To edit tiffin details
        [HttpPatch("updatetiffin")]
        public ActionResult<Tiffin> UpdateTiffin([FromBody] Tiffin tiffin)
        {
            var tiffinToUpdate = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffin.TiffinId);
            if (tiffinToUpdate != null)
            {
                tiffinToUpdate.TiffinName = tiffin.TiffinName;
                tiffinToUpdate.Description = tiffin.Description;
                tiffinToUpdate.TiffinCategory = tiffin.TiffinCategory;
                tiffinToUpdate.TiffinPrice = tiffin.TiffinPrice;
                tiffinToUpdate.ImageLink = tiffin.ImageLink;
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToUpdate);
            }
            else { return NotFound(); }
        }

        //8
        //To mark the tiffin as inactive
        [HttpPatch("deletetiffin")]
        public ActionResult<Tiffin> DeleteTiffin([FromBody] int tiffinId)
        {
            var tiffinToDelete = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if (tiffinToDelete != null)
            {
                tiffinToDelete.Status = "inactive";
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToDelete);
            }
            else { return NotFound(); }
        }

        //9
        //To active the tiffin
        [HttpPatch("activethetiffin")]
        public ActionResult<Tiffin> ActiveTheTiffin([FromBody] int tiffinId)
        {
            var tiffinToUpdate = _context.Tiffins.FirstOrDefault(
                t => t.TiffinId == tiffinId);
            if (tiffinToUpdate != null)
            {
                tiffinToUpdate.Status = "active";
                _context.SaveChanges();
                return new ActionResult<Tiffin>(tiffinToUpdate);
            }
            else { return NotFound(); }
        }

        //10
        //To get the vendor's details by vendorId
        [HttpPost("getvendorbyid")]
        public ActionResult<Vendor> GetVendorById([FromBody] int vendorId)
        {
            var vendor = _context.Vendors.FirstOrDefault(
                v => v.VendorId == vendorId);
            if (vendor != null)
            {
                return new ActionResult<Vendor>(vendor);
            }
            else
            { return NotFound(); }
        }

        //11
        //To edit the vendor's details
        [HttpPatch("updateprofile")]
        public ActionResult<Vendor> UpdateProfile([FromBody] Vendor vendor)
        {
            var vendorToUpdate = _context.Vendors.FirstOrDefault(
                v => v.VendorId == vendor.VendorId);
            if (vendorToUpdate != null)
            {
                vendorToUpdate.Name = vendor.Name;
                vendorToUpdate.Address = vendor.Address;
                vendorToUpdate.Pincode = vendor.Pincode;
                vendorToUpdate.Email = vendor.Email;
                vendorToUpdate.MobNo = vendor.MobNo;
                _context.SaveChanges();
                return new ActionResult<Vendor>(vendorToUpdate);
            }
            else { return NotFound(); }
        }

        //12
        //To change vendor's password
        [HttpPatch("changepassword")]
        public ActionResult<Vendor> ChangePassword(int vendorId, [FromBody] String password)
        {
            var vendor = _context.Vendors.FirstOrDefault(
                v => v.VendorId == vendorId);
            if (vendor != null)
            {
                vendor.Password = password;
                _context.SaveChanges();
                return new ActionResult<Vendor>(vendor);
            }
            else { return NotFound(); }
        }

        //13
        //To show the feedbacks and complaints against the vendor
        [HttpPost("showfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowFeedbacks(int vendorId)
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var result = query.ToList();
            return result;
        }

        //14
        //To show only 'under review' complaints
        [HttpPost("showunderreviewfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowUnderReviewFeedbacks(int vendorId)
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId && feedbackComplaint.Status == "under review"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var result = query.ToList();
            return result;
        }

        //15
        //To show only 'escalated' complaints
        [HttpPost("showescalatedfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowEscalatedFeedbacks(int vendorId)
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId && feedbackComplaint.Status == "escalated"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var result = query.ToList();
            return result;
        }

        //16
        //To show only feedbacks
        [HttpPost("showeonlyfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyFeedbacks(int vendorId)
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId && feedbackComplaint.Category == "feedback"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var result = query.ToList();
            return result;
        }

        //17
        //To show only complaints
        [HttpPost("showeonlycomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyComplaints(int vendorId)
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where vendor.VendorId == vendorId && feedbackComplaint.Category == "complaint"
                        select new FeedbacksToDisplay
                        {
                            FcId = feedbackComplaint.FcId,
                            CustomerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            VendorName = vendor.Name,
                            FeedbackCategory = feedbackComplaint.Category,
                            FeedbackDescription = feedbackComplaint.Description,
                            TimeStamp = feedbackComplaint.Timestamp,
                            FeedbackStatus = feedbackComplaint.Status
                        };
            var result = query.ToList();
            return result;
        }

        //18
        //To send the approval request to admin
        [HttpPost("sendapprovalrequest")]
        public ActionResult<ApprovalRequest> SendApprovalRequest([FromBody] ApprovalRequest request)
        {
            _context.ApprovalRequests.Add(request);
            _context.SaveChanges();
            return new ActionResult<ApprovalRequest>(request);
        }

        //19
        //To mark the tiffin as delivered
        [HttpPatch("deliver")]
        public ActionResult<Order> Deliver(int orderId)
        {
            var orderToDeliver = _context.Orders.FirstOrDefault(
                o => o.OrderId == orderId);
            if (orderToDeliver != null)
            {
                orderToDeliver.Status = "delivered";
                _context.SaveChanges();
                return new ActionResult<Order>(orderToDeliver);
            }
            else { return NotFound(); }
        }
    }
}
