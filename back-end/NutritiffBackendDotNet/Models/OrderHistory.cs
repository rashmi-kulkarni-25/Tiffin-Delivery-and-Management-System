namespace NutritiffBackendDotNet.Models
{
    public class OrdersHistory
    {
        public int orderId { get; set; }
        public string? customerName { get; set; }
        public string? tiffinName { get; set; }
        public int quantity { get; set; }
        public double totalPrice { get; set; }
        public DateTime timestamp { get; set; }
        public string? status { get; set; }
    }
}