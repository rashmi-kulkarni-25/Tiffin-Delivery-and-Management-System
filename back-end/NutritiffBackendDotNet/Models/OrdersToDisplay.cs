namespace NutritiffBackendDotNet.Models
{
    public class OrdersToDisplay
    {
        public int orderId { get; set; }
        public string? customerName { get; set; }
        public string? homeAddress { get; set; }
        public string? workAddress { get; set; }
        public string? vendorName { get; set; }
        public string? tiffinName { get; set; }
        public int? quantity { get; set; }

    }
}