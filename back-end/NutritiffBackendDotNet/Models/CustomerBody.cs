namespace NutritiffBackendDotNet.Models
{
    public class CustomerBody
    {
        public int CustomerId { get; set; }
        public string? Name { get; set; }
        public string? HomeAddress { get; set; }
        public string? WorkAddress { get; set; }
        public string? Pincode { get; set; }
        public string? Email { get; set; }
        public string? MobNo { get; set; }
    }
}
