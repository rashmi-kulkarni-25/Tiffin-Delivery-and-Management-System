using Humanizer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nutritiff.Data;
using Nutritiff.Models;
using NutritiffBackendDotNet.Models;

namespace NutritiffBackendDotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly NutritiffContext _context;
        private readonly Random _random = new Random();

        public CustomersController(NutritiffContext context)
        {
            _context = context;
        }

        //1
        //To display all tiffins to customer (customer home page)
        [HttpGet("tiffins")]
        public IEnumerable<Tiffin> GetAllTiffins()
        {
            return _context.Tiffins.ToList();
        }

        //[HttpGet("tiffins")]
        //public async IAsyncEnumerable<Tiffin> GetAllTiffins()
        //{
        //    await Task.Yield(); // Ensure asynchronous context

        //    foreach (var tiffin in _context.Tiffins)
        //    {
        //        yield return tiffin;
        //    }
        //}

        //2
        //To display only veg tiffins to customer
        [HttpGet("tiffins/veg")]
        public IEnumerable<Tiffin> GetVegTiffins()
        {
            return _context.Tiffins.Where(t => t.TiffinCategory == "veg").ToList();
        }

        //3
        //To display only non veg tiffins to customer
        [HttpGet("tiffins/nonveg")]
        public IEnumerable<Tiffin> GetNonvegTiffins()
        {
            return _context.Tiffins.Where(t => t.TiffinCategory == "nonveg").ToList();
        }

        //4
        //To login the customer
        [HttpPost("login")]
        public ActionResult<Customer> Login([FromBody] LoginRequest request)
        {
            var activeCustomer = _context.Customers.FirstOrDefault(
                c => c.Email == request.Email && c.Password == request.Password && c.ActiveStatus == "active");
            if (activeCustomer != null)
            {
                return new ActionResult<Customer>(activeCustomer);
            }
            else
            {
                return NotFound();
            }
        }

        //5
        //To register the customer
        [HttpPost("register")]
        public ActionResult<Customer> Register([FromBody] Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return new ActionResult<Customer>(customer);
        }

        //6
        //To add a tiffin to cart
        [HttpPost("cart")]
        public ActionResult<Cart> AddToCart([FromBody] Cart cart)
        {
            _context.Carts.Add(cart);
            _context.SaveChanges();
            return new ActionResult<Cart>(cart);
        }

        //7
        //To increase the quantity of tiffins in a cart
        [HttpPatch("cart/increase")]
        public ActionResult<Cart> IncreaseQuantity([FromBody] int cartId)
        {
            var cartToUpdate = _context.Carts.FirstOrDefault(
                c => c.CartId == cartId);
            if (cartToUpdate != null)
            {
                cartToUpdate.Quantity += 1;
                _context.SaveChanges();
                return new ActionResult<Cart>(cartToUpdate);
            }
            else
            { return NotFound(); }
        }

        //8
        //To decrease the quantity of tiffins in a cart
        [HttpPatch("cart/decrease")]
        public ActionResult<Cart> DecreaseQuantity([FromBody] int cartId)
        {
            var cartToUpdate = _context.Carts.FirstOrDefault(
                c => c.CartId == cartId);
            if (cartToUpdate != null)
            {
                if (cartToUpdate.Quantity > 1)
                {
                    cartToUpdate.Quantity -= 1;
                    _context.SaveChanges();
                    return new ActionResult<Cart>(cartToUpdate);
                }
                else
                {
                    var cart = DeleteCart(cartToUpdate);
                    return new ActionResult<Cart>(cart);
                }
            }
            else
            { return NotFound(); }
        }

        //9
        //To delete the tiffin from cart
        [HttpDelete("cart/delete")]
        public Cart DeleteCart(Cart cartToDelete)
        {
            _context.Carts.Remove(cartToDelete);
            _context.SaveChanges();
            return cartToDelete;
        }

        //10
        //To remove all items form cart
        [HttpDelete("cart/deleteall")]
        public IEnumerable<Cart> DeleteAllFromCart(int customerId)
        {
            var cartsToDelete = _context.Carts.Where(
                c => c.CustomerId == customerId).ToList();
            _context.Carts.RemoveRange(cartsToDelete);
            _context.SaveChanges();
            return cartsToDelete;
        }

        //9
        //[HttpPost("placeorder")]
        //public ActionResult<Order> PlaceOrder([FromBody] Order order)
        //{
        //        _context.Orders.Add(order);
        //        _context.SaveChanges();
        //        return new ActionResult<Order>(order);
        //}

        //11
        //To place order
        [HttpPost("placeorder")]
        public string PlaceOrder([FromBody] Order order)
        {
            string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            char[] randomChars = new char[15];
            for (int i = 0; i < 15; i++)
            {
                randomChars[i] = Characters[_random.Next(0, Characters.Length)];
            }
            string transactionID = new string(randomChars);
            order.TransactionId = transactionID;
            _context.Orders.Add(order);
            _context.SaveChanges();

            int customerId = order.CustomerId;

            var query = from or in _context.Orders
                        join cart in _context.Carts on or.CustomerId equals cart.CustomerId
                        where or.CustomerId == customerId && or.Status == "ordered"
                        select new OrderNew
                        {
                            OrderId = or.OrderId,
                            TiffinId = cart.TiffinId,
                            Quantity = cart.Quantity,
                            Price = or.TotalPrice
                        };

            foreach (var item in query)
            {
                _context.OrderItems.Add(new OrderItem
                {
                    OrderId = item.OrderId,
                    TiffinId = item.TiffinId,
                    Quantity = item.Quantity,
                    Price = item.Price
                });
            }
            _context.SaveChanges();

            var carts = DeleteAllFromCart(customerId);
            return "Order placed";
        }

        //12
        //To display the customer's orders history
        [HttpPost("myorders")]
        public IEnumerable<PlaceOrder> GetMyOrders([FromBody] int customerId)
        {
            var query = from tiffin in _context.Tiffins
                        join orderItem in _context.OrderItems on tiffin.TiffinId equals orderItem.TiffinId
                        join order in _context.Orders on orderItem.OrderId equals order.OrderId
                        where order.CustomerId == customerId
                        select new PlaceOrder
                        {
                            orderId = order.OrderId,
                            tiffinId = orderItem.TiffinId,
                            tiffinName = tiffin.TiffinName,
                            quantity = orderItem.Quantity,
                            totalPrice = order.TotalPrice,
                            transactionId = order.TransactionId,
                            timestamp = order.Timestamp,
                            status = order.Status
                        };

            var results = query.ToList();
            return results;

            //var myorders =  _context.Orders.Where(
            //    o => o.CustomerId == customerId).ToList();
            //if(myorders != null)
            //{
            //    return myorders;
            //}
            //else
            //{ return Enumerable.Empty<Order>(); }
        }

        //13
        //To cancel the order
        [HttpPatch("cancelorder")]
        public ActionResult<Order> CancelMyOrder([FromBody] int orderId)
        {
            var order = _context.Orders.FirstOrDefault(
                o => o.OrderId == orderId && o.Status == "ordered");
            if (order != null)
            {
                order.Status = "canceled";
                _context.SaveChanges();
                return new ActionResult<Order>(order);
            }
            else
            {
                return NotFound();
            }
        }

        //14
        //To display only delivered order history
        [HttpPost("myorders/delivered")]
        public IEnumerable<PlaceOrder> DeliveredOrders([FromBody] int customerId)
        {
            var query = from tiffin in _context.Tiffins
                        join orderItem in _context.OrderItems on tiffin.TiffinId equals orderItem.TiffinId
                        join order in _context.Orders on orderItem.OrderId equals order.OrderId
                        where order.CustomerId == customerId && order.Status == "delivered"
                        select new PlaceOrder
                        {
                            orderId = order.OrderId,
                            tiffinId = orderItem.TiffinId,
                            tiffinName = tiffin.TiffinName,
                            quantity = orderItem.Quantity,
                            totalPrice = order.TotalPrice,
                            transactionId = order.TransactionId,
                            timestamp = order.Timestamp,
                            status = order.Status
                        };

            var results = query.ToList();
            return results;

            //var order = _context.Orders.Where(
            //    o => o.CustomerId == customerId && o.Status == "delivered").ToList();
            //if (order != null)
            //{
            //    return order;
            //}
            //else
            //{ return Enumerable.Empty<Order>(); }
        }

        //15
        //To display canceled orders history
        [HttpPost("myorders/canceled")]
        public IEnumerable<PlaceOrder> CanceledOrders([FromBody] int customerId)
        {
            var query = from tiffin in _context.Tiffins
                        join orderItem in _context.OrderItems on tiffin.TiffinId equals orderItem.TiffinId
                        join order in _context.Orders on orderItem.OrderId equals order.OrderId
                        where order.CustomerId == customerId && order.Status == "canceled"
                        select new PlaceOrder
                        {
                            orderId = order.OrderId,
                            tiffinId = orderItem.TiffinId,
                            tiffinName = tiffin.TiffinName,
                            quantity = orderItem.Quantity,
                            totalPrice = order.TotalPrice,
                            transactionId = order.TransactionId,
                            timestamp = order.Timestamp,
                            status = order.Status
                        };

            var results = query.ToList();
            return results;

            //var order = _context.Orders.Where(
            //    o => o.CustomerId == customerId && o.Status == "canceled").ToList();
            //if (order != null)
            //{
            //    return order;
            //}
            //else
            //{ return Enumerable.Empty<Order>(); }
        }

        //16
        //To display ordered orders history
        [HttpPost("myorders/ordered")]
        public IEnumerable<PlaceOrder> OrderedOrders([FromBody] int customerId)
        {
            var query = from tiffin in _context.Tiffins
                        join orderItem in _context.OrderItems on tiffin.TiffinId equals orderItem.TiffinId
                        join order in _context.Orders on orderItem.OrderId equals order.OrderId
                        where order.CustomerId == customerId && order.Status == "ordered"
                        select new PlaceOrder
                        {
                            orderId = order.OrderId,
                            tiffinId = orderItem.TiffinId,
                            tiffinName = tiffin.TiffinName,
                            quantity = orderItem.Quantity,
                            totalPrice = order.TotalPrice,
                            transactionId = order.TransactionId,
                            timestamp = order.Timestamp,
                            status = order.Status
                        };

            var results = query.ToList();
            return results;

            //var order = _context.Orders.Where(
            //    o => o.CustomerId == customerId && o.Status == "ordered").ToList();
            //if (order != null)
            //{
            //    return order;
            //}
            //else
            //{ return Enumerable.Empty<Order>(); }
        }

        //17
        //To get customer's details by customerId
        [HttpGet("profile")]
        public ActionResult<Customer> GetProfile(int customerId)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == customerId);
            if (customer != null)
            {
                return new ActionResult<Customer>(customer);
            }
            else
            {
                return NotFound();
            }
        }

        //18
        //To update customer's details
        [HttpPatch("updateprofile")]
        public ActionResult<Customer> UpdateProfile([FromBody] CustomerBody customer)
        {
            var updatedCustomer = _context.Customers.FirstOrDefault(
                c => c.CustomerId == customer.CustomerId);
            if (updatedCustomer != null)
            {
                updatedCustomer.Name = customer.Name;
                updatedCustomer.HomeAddress = customer.HomeAddress;
                updatedCustomer.WorkAddress = customer.WorkAddress;
                updatedCustomer.Pincode = customer.Pincode;
                updatedCustomer.Email = customer.Email;
                updatedCustomer.MobNo = customer.MobNo;
                _context.SaveChanges();
                return new ActionResult<Customer>(updatedCustomer);
            }
            else
            {
                return NotFound();
            }
        }

        //19
        //To change customer's password
        [HttpPatch("changepassword")]
        public ActionResult<Customer> ChangePassword(int customerId, [FromBody] string password)
        {
            var customer = _context.Customers.FirstOrDefault(
                c => c.CustomerId == customerId);
            if (customer != null)
            {
                customer.Password = password;
                _context.SaveChanges();
                return new ActionResult<Customer>(customer);
            }
            else
            {
                return NotFound();
            }
        }

        //20
        //To add a feedback or complaint for a vendor or tiffin
        [HttpPost("feedback")]
        public ActionResult<FeedbackComplaint> GiveFeedback([FromBody] FeedbackComplaint feedback)
        {
            _context.FeedbackComplaints.Add(feedback);
            _context.SaveChanges();
            return new ActionResult<FeedbackComplaint>(feedback);
        }

        //21
        //To add a tiffin to favorites
        [HttpPost("addtofavorites")]
        public ActionResult<Favorite> AddToFavorites([FromBody] Favorite favorite)
        {
            _context.Favorites.Add(favorite);
            _context.SaveChanges();
            return new ActionResult<Favorite>(favorite);
        }

        //22
        //To purchase a subscription plan
        [HttpPost("purchaseplan")]
        public ActionResult<SubscriptionPurchase> PurchasePlan([FromBody] SubscriptionPurchase subscription)
        {
            string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            char[] randomChars = new char[15];
            for (int i = 0; i < 15; i++)
            {
                randomChars[i] = Characters[_random.Next(0, Characters.Length)];
            }
            string transactionID = new string(randomChars);
            subscription.TransactionId = transactionID;

            _context.SubscriptionPurchases.Add(subscription);
            _context.SaveChanges();

            int customerId = subscription.CustomerId;
            UpdateSubPlanDetails(customerId);
            return new ActionResult<SubscriptionPurchase>(subscription);
        }

        //23
        //To edit subscription plan
        [HttpPatch("updatesubplandetails")]
        public void UpdateSubPlanDetails(int customerId)
        {
            var customerToUpdate = _context.Customers.FirstOrDefault(
                c => c.CustomerId == customerId);
            if(customerToUpdate != null)
            {
                customerToUpdate.SubPlan = "active";
                _context.SaveChanges();
            }
            else { return; }
        }

        //24
        //To cancel current subscription plan
        [HttpPatch("cancelplan")]
        public ActionResult<SubscriptionPurchase> CancelPlan(int purchaseId)
        {
            var plan = _context.SubscriptionPurchases.FirstOrDefault(
                p => p.PurchaseId == purchaseId);
            if (plan != null)
            {
                plan.Status = "inactive";
                _context.SaveChanges();

                var customerId = plan.CustomerId;
                var customerToUpdate = _context.Customers.FirstOrDefault(
                    c => c.CustomerId == customerId);
                if(customerToUpdate != null)
                {
                    customerToUpdate.SubPlan = "inactive";
                    _context.SaveChanges();
                }
                else { }
                return new ActionResult<SubscriptionPurchase>(plan);
            }
            else
            { return NotFound(); }
        }
    }
}
