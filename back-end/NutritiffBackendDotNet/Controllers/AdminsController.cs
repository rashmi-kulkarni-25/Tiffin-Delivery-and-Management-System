﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackendDotNet.Models;

namespace NutritiffBackendDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly NutritiffContext _context;

        public AdminsController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        [HttpPost("login")]
        public ActionResult<Admin> Login([FromBody] String password)
        {
            var admin = _context.Admins.FirstOrDefault(
                a => a.Password == password);
            if (admin != null)
            {
                return new ActionResult<Admin>(admin);
            }
            else { return NotFound(); }
        }

        //2
        [HttpGet("showpendingrequests")]
        public IEnumerable<Request> ShowPendingRequests()
        {
            var query = from vendor in _context.Vendors
                        join approvalRequest in _context.ApprovalRequests
                            on vendor.VendorId equals approvalRequest.VendorId
                        where approvalRequest.Status == "pending"
                        select new Request
                        {
                            VendorId = vendor.VendorId,
                            Name = vendor.Name,
                            Address = vendor.Address,
                            Pincode = vendor.Pincode,
                            Email = vendor.Email,
                            MobNo = vendor.MobNo,
                            Status = vendor.Status
                        };
            var results = query.ToList();
            return results;
        }

        //3
        [HttpGet("showrequesthistory")]
        public IEnumerable<Request> ShowRequestHistory()
        {
            var query = from vendor in _context.Vendors
                        join approvalRequest in _context.ApprovalRequests
                            on vendor.VendorId equals approvalRequest.VendorId
                        select new Request
                        {
                            VendorId = vendor.VendorId,
                            Name = vendor.Name,
                            Address = vendor.Address,
                            Pincode = vendor.Pincode,
                            Email = vendor.Email,
                            MobNo = vendor.MobNo,
                            Status = vendor.Status
                        };
            var results = query.ToList();
            return results;
        }

        //4
        [HttpPatch("approve")]
        [Produces("application/json")]
        public ActionResult<ApprovalRequest> ApproveTheVendor(int vendorId)
        {
            var requestToApprove = _context.ApprovalRequests.FirstOrDefault(
                r => r.VendorId == vendorId);
            if (requestToApprove != null)
            {
                requestToApprove.Status = "approved";
                _context.SaveChanges();
                var vendor = _context.Vendors.FirstOrDefault(
                    v => v.VendorId == vendorId);
                vendor.Status = "approved";
                _context.SaveChanges();
                return new ActionResult<ApprovalRequest>(requestToApprove);
            }
            else { return NotFound(); }
        }

        //5
        [HttpPatch("reject")]
        public ActionResult<ApprovalRequest> RejectTheVendor(int vendorId)
        {
            var requestToApprove = _context.ApprovalRequests.FirstOrDefault(
                r => r.VendorId == vendorId);
            if (requestToApprove != null)
            {
                requestToApprove.Status = "rejected";
                _context.SaveChanges();
                var vendor = _context.Vendors.FirstOrDefault(
                    v => v.VendorId == vendorId);
                vendor.Status = "rejected";
                _context.SaveChanges();
                return new ActionResult<ApprovalRequest>(requestToApprove);
            }
            else { return NotFound(); }
        }

        //6
        [HttpGet("showapprovedvendors")]
        public IEnumerable<Vendor> ShowApprovedVendors()
        {
            return _context.Vendors.Where(v => v.Status == "approved").ToList();
        }

        //7
        [HttpGet("showallfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowAllFeedbacks()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
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
            var results = query.ToList();
            return results;
        }

        //8
        [HttpGet("showonlyfeedbacks")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyFeedbacks()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Category == "feedback"
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
            var results = query.ToList();
            return results;
        }

        //9
        [HttpGet("showonlycomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowOnlyComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Category == "complaint"
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
            var results = query.ToList();
            return results;
        }

        //10
        [HttpGet("showunderreviewcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowUnderReviewComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "under review"
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
            var results = query.ToList();
            return results;
        }

        //11
        [HttpGet("showresolvedcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowResolvedComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "resolved"
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
            var results = query.ToList();
            return results;
        }

        //12
        [HttpGet("showescalatedcomplaints")]
        public IEnumerable<FeedbacksToDisplay> ShowEscalatedComplaints()
        {
            var query = from feedbackComplaint in _context.FeedbackComplaints
                        join customer in _context.Customers on feedbackComplaint.CustomerId equals customer.CustomerId
                        join tiffin in _context.Tiffins on feedbackComplaint.TiffinId equals tiffin.TiffinId
                        join vendor in _context.Vendors on tiffin.VendorId equals vendor.VendorId
                        where feedbackComplaint.Status == "escalated"
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
            var results = query.ToList();
            return results;
        }

        //13
        [HttpPatch("resolvecomplaint")]
        public ActionResult<FeedbackComplaint> ResolveComplaint(int complaintId)
        {
            var complaintToResolve = _context.FeedbackComplaints.FirstOrDefault(
                c => c.FcId == complaintId);
            if (complaintToResolve != null)
            {
                complaintToResolve.Status = "resolved";
                _context.SaveChanges();
                return new ActionResult<FeedbackComplaint>(complaintToResolve);
            }
            else { return NotFound(); }
        }

        //14
        [HttpPatch("escalatecomplaint")]
        public ActionResult<FeedbackComplaint> EscalateComplaint(int complaintId)
        {
            var complaintToResolve = _context.FeedbackComplaints.FirstOrDefault(
                c => c.FcId == complaintId);
            if (complaintToResolve != null)
            {
                complaintToResolve.Status = "escalated";
                _context.SaveChanges();
                return new ActionResult<FeedbackComplaint>(complaintToResolve);
            }
            else { return NotFound(); }
        }

        //15
        [HttpGet("subscriptionplans")]
        public IEnumerable<SubscriptionPlan> GetAllPlans()
        {
            return _context.SubscriptionPlans.ToList();
        }

        //16
        [HttpPost("addplan")]
        public ActionResult<SubscriptionPlan> AddPlan([FromBody] SubscriptionPlan plan)
        {
            _context.SubscriptionPlans.Add(plan);
            _context.SaveChanges();
            return new ActionResult<SubscriptionPlan>(plan);
        }

        //17
        [HttpPost("getplanbyid")]
        public ActionResult<SubscriptionPlan> GetPlanById(int planId)
        {
            var plan = _context.SubscriptionPlans.FirstOrDefault(
                p => p.PlanId == planId);
            if (plan != null)
            {
                return new ActionResult<SubscriptionPlan>(plan);
            }
            else { return NotFound(); }
        }

        //18
        [HttpPatch("updateplan")]
        public ActionResult<SubscriptionPlan> UpdatePlan([FromBody] SubscriptionPlan plan)
        {
            var planToUpdate = _context.SubscriptionPlans.FirstOrDefault(
                p => p.PlanId == plan.PlanId);
            if (planToUpdate != null)
            {
                planToUpdate.Name = plan.Name;
                planToUpdate.Description = plan.Description;
                planToUpdate.Price = plan.Price;
                planToUpdate.NoOfMeals = plan.NoOfMeals;
                _context.SaveChanges();
                return new ActionResult<SubscriptionPlan>(planToUpdate);
            }
            else { return NotFound(); }
        }

        //19
        [HttpDelete("deleteplan")]
        public ActionResult<SubscriptionPlan> DeletePlan(int planId)
        {
            var planToDelete = _context.SubscriptionPlans.FirstOrDefault(
                p => p.PlanId == planId);
            if (planToDelete != null)
            {
                _context.SubscriptionPlans.Remove(planToDelete);
                _context.SaveChanges();
                return new ActionResult<SubscriptionPlan>(planToDelete);
            }
            else
            { return NotFound(); }
        }

        //20
        [HttpGet("getpurchasehistory")]
        public IEnumerable<SubscriptionPurchase> GetPurchaseHistory()
        {
            return _context.SubscriptionPurchases.ToList();
        }

        //21
        [HttpGet("getordershistory")]
        public IEnumerable<OrdersHistory> GetOrdersHistory()
        {
            var query = from tiffin in _context.Tiffins
                        join orderItem in _context.OrderItems on tiffin.TiffinId equals orderItem.TiffinId
                        join order in _context.Orders on orderItem.OrderId equals order.OrderId
                        join customer in _context.Customers on order.CustomerId equals customer.CustomerId
                        orderby order.OrderId
                        select new OrdersHistory
                        {
                            orderId = order.OrderId,
                            customerName = customer.Name,
                            tiffinName = tiffin.TiffinName,
                            quantity = orderItem.Quantity,
                            totalPrice = order.TotalPrice,
                            timestamp = order.Timestamp,
                            status = order.Status
                        };

            var results = query.ToList();
            return (IEnumerable<OrdersHistory>)results;
        }

        //22
        [HttpGet("getrevenuebymonth")]
        public double GetRevenueByMonth(int month)
        {

            var totalSum = _context.Orders
                .Where(order => order.Timestamp.Month == month)
                .Sum(order => order.TotalPrice);
            return totalSum;
        }

        //23
        [HttpGet("getrevenuebycurrentmonth")]
        public double GetRevenueByCurrentMonth()
        {
            var currentDate = DateTime.Now;

            var totalSum = _context.Orders
                .Where(order => order.Timestamp.Month == currentDate.Month)
                .Sum(order => order.TotalPrice);
            return totalSum;
        }

        //24
        [HttpGet("getrevenuebyyear")]
        public double GetRevenueByYear(int year)
        {
            var totalSum = _context.Orders
                .Where(order => order.Timestamp.Year == year)
                .Sum(order => order.TotalPrice);
            return totalSum;
        }

        //25
        [HttpGet("sumofrevenuebymonth")]
        public double SumOfRevenueByMonth(int month)
        {
            var totalSum = (from purchase in _context.SubscriptionPurchases
                            join plan in _context.SubscriptionPlans on purchase.PlanId equals plan.PlanId
                            where purchase.Timestamp.Month == month
                            select plan.Price).Sum();
            return totalSum;
        }

        //26
        [HttpGet("sumofrevenuebycurrentmonth")]
        public double SumOfRevenueByCurrentMonth()
        {
            var currentMonth = DateTime.Now.Month;
            var totalSum = (from purchase in _context.SubscriptionPurchases
                            join plan in _context.SubscriptionPlans on purchase.PlanId equals plan.PlanId
                            where purchase.Timestamp.Month == currentMonth
                            select plan.Price).Sum();
            return totalSum;
        }

        //27
        [HttpGet("sumofrevenuebyyear")]
        public double SumOfRevenueByYear(int year)
        {
            var totalSum = (from purchase in _context.SubscriptionPurchases
                            join plan in _context.SubscriptionPlans on purchase.PlanId equals plan.PlanId
                            where purchase.Timestamp.Year == year
                            select plan.Price)
                           .Sum();
            return totalSum;
        }
    }
}
