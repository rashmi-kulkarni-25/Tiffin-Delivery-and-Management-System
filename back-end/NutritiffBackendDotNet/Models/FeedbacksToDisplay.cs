namespace NutritiffBackendDotNet.Models
{
    public class FeedbacksToDisplay
    {
        public int FcId { get; set; }
        public string? CustomerName { get; set; }
        public string? tiffinName { get; set; }
        public string? VendorName { get; set; }
        public string? FeedbackCategory { get; set; }
        public string? FeedbackDescription { get; set; }
        public DateTime TimeStamp { get; set; }
        public string? FeedbackStatus { get; set; }
    }
}
