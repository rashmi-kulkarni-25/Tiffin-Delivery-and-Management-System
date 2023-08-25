using System;
using System.Collections.Generic;

namespace Nutritiff.Models;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string Name { get; set; } = null!;

    public string HomeAddress { get; set; } = null!;

    public string WorkAddress { get; set; } = null!;

    public string Pincode { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string MobNo { get; set; } = null!;

    public string? SubPlan { get; set; }

    public string? ActiveStatus { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public virtual ICollection<FeedbackComplaint> FeedbackComplaints { get; set; } = new List<FeedbackComplaint>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
