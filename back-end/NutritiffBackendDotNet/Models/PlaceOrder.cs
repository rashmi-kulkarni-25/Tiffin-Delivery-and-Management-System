namespace NutritiffBackendDotNet.Models
{
    public class PlaceOrder
    {
        public int orderId { get; set; }
        public int tiffinId { get; set; }
        public string? tiffinName { get; set; }
        public int quantity { get; set; }
        public double totalPrice { get; set; }
        public string? transactionId { get; set; }
        public DateTime timestamp { get; set; }
        public string? status { get; set; }
    }
}
