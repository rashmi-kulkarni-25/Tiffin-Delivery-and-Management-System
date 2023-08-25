using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Nutritiff.Models;

public partial class Tiffin
{
    public int TiffinId { get; set; }

    public string TiffinName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string TiffinCategory { get; set; } = null!;

    public float TiffinPrice { get; set; }

    public int VendorId { get; set; }

    public string ImageLink { get; set; } = null!;

    public string? Status { get; set; }

    [JsonIgnore]
    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    [JsonIgnore]
    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    [JsonIgnore]
    public virtual ICollection<FeedbackComplaint> FeedbackComplaints { get; set; } = new List<FeedbackComplaint>();

    [JsonIgnore]
    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    [JsonIgnore]
    public virtual Vendor? Vendor { get; set; }
}
