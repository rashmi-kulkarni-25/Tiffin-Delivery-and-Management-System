﻿namespace NutritiffBackendDotNet.Models
{
    public class ShowOrder
    {
        public int orderId { get; set; }
        public int tiffinId { get; set; }
        public int customerId { get; set; }
        public double totalPrice { get; set; }
        public string transactionId { get; set; }
        public string? customerName { get; set; }
        public string? customerHomeAddress { get; set; }
        public string? customerWorkAddress { get; set; }
        public string? vendorName { get; set; }
        public string? tiffinName { get; set; }
        public int quantity { get; set; }
    }
}
