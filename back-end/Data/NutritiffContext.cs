using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Nutritiff.Models;

namespace Nutritiff.Data;

public partial class NutritiffContext : DbContext
{
    public NutritiffContext(DbContextOptions<NutritiffContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<ApprovalRequest> ApprovalRequests { get; set; }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DeliveryPerson> DeliveryPeople { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<FeedbackComplaint> FeedbackComplaints { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Sample> Samples { get; set; }

    public virtual DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

    public virtual DbSet<SubscriptionPurchase> SubscriptionPurchases { get; set; }

    public virtual DbSet<Tiffin> Tiffins { get; set; }

    public virtual DbSet<Vendor> Vendors { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PRIMARY");

            entity.ToTable("admin");

            entity.Property(e => e.AdminId).HasColumnName("admin_id");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
        });

        modelBuilder.Entity<ApprovalRequest>(entity =>
        {
            entity.HasKey(e => e.ReqId).HasName("PRIMARY");

            entity.ToTable("approval_requests");

            entity.HasIndex(e => e.VendorId, "fk_apprreq_vendorid_idx");

            entity.Property(e => e.ReqId).HasColumnName("req_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValueSql("'pending'")
                .HasColumnName("status");
            entity.Property(e => e.VendorId).HasColumnName("vendor_id");

            entity.HasOne(d => d.Vendor).WithMany(p => p.ApprovalRequests)
                .HasForeignKey(d => d.VendorId)
                .HasConstraintName("fk_apprreq_vendorid");
        });

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PRIMARY");

            entity.ToTable("cart");

            entity.HasIndex(e => e.CustomerId, "fk_cart_customerid_idx");

            entity.HasIndex(e => e.TiffinId, "fk_cart_tiffinid_idx");

            entity.Property(e => e.CartId).HasColumnName("cart_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'1'")
                .HasColumnName("quantity");
            entity.Property(e => e.TiffinId).HasColumnName("tiffin_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Carts)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_cart_customerid");

            entity.HasOne(d => d.Tiffin).WithMany(p => p.Carts)
                .HasForeignKey(d => d.TiffinId)
                .HasConstraintName("fk_cart_tiffinid");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PRIMARY");

            entity.ToTable("customers");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.MobNo, "mob_no_UNIQUE").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.ActiveStatus)
                .HasMaxLength(10)
                .HasDefaultValueSql("'active'")
                .HasColumnName("active_status");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.HomeAddress)
                .HasMaxLength(100)
                .HasColumnName("home_address");
            entity.Property(e => e.MobNo)
                .HasMaxLength(13)
                .HasColumnName("mob_no");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.Pincode)
                .HasMaxLength(6)
                .HasColumnName("pincode");
            entity.Property(e => e.SubPlan)
                .HasMaxLength(10)
                .HasDefaultValueSql("'inactive'")
                .HasColumnName("sub_plan");
            entity.Property(e => e.WorkAddress)
                .HasMaxLength(100)
                .HasColumnName("work_address");
        });

        modelBuilder.Entity<DeliveryPerson>(entity =>
        {
            entity.HasKey(e => e.Pid).HasName("PRIMARY");

            entity.ToTable("delivery_person");

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.MobNo, "mob_no_UNIQUE").IsUnique();

            entity.Property(e => e.Pid).HasColumnName("pid");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.LicenceNo)
                .HasMaxLength(20)
                .HasDefaultValueSql("'licencenumber'")
                .HasColumnName("licence_no");
            entity.Property(e => e.MobNo)
                .HasMaxLength(13)
                .HasColumnName("mob_no");
            entity.Property(e => e.Name)
                .HasMaxLength(25)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(45)
                .HasColumnName("password");
            entity.Property(e => e.Pincode)
                .HasMaxLength(6)
                .HasColumnName("pincode");
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FId).HasName("PRIMARY");

            entity.ToTable("favorites");

            entity.HasIndex(e => e.CustomerId, "fk_favorites_customerid_idx");

            entity.HasIndex(e => e.TiffinId, "fk_favorites_tiffinid_idx");

            entity.Property(e => e.FId).HasColumnName("f_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.TiffinId).HasColumnName("tiffin_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_favorites_customerid");

            entity.HasOne(d => d.Tiffin).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.TiffinId)
                .HasConstraintName("fk_favorites_tiffinid");
        });

        modelBuilder.Entity<FeedbackComplaint>(entity =>
        {
            entity.HasKey(e => e.FcId).HasName("PRIMARY");

            entity.ToTable("feedback_complaints");

            entity.HasIndex(e => e.CustomerId, "fk_fc_customerid_idx");

            entity.HasIndex(e => e.TiffinId, "fk_fc_tiffinid_idx");

            entity.Property(e => e.FcId).HasColumnName("fc_id");
            entity.Property(e => e.Category)
                .HasMaxLength(10)
                .HasDefaultValueSql("'feedback'")
                .HasColumnName("category");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasDefaultValueSql("'feedback'")
                .HasColumnName("description");
            entity.Property(e => e.Status)
                .HasMaxLength(15)
                .HasColumnName("status");
            entity.Property(e => e.TiffinId).HasColumnName("tiffin_id");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("timestamp");

            entity.HasOne(d => d.Customer).WithMany(p => p.FeedbackComplaints)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_fc_customerid");

            entity.HasOne(d => d.Tiffin).WithMany(p => p.FeedbackComplaints)
                .HasForeignKey(d => d.TiffinId)
                .HasConstraintName("fk_fc_tiffinid");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.CustomerId, "fk_orders_customerid_idx");

            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValueSql("'ordered'")
                .HasColumnName("status");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("timestamp");
            entity.Property(e => e.TotalPrice).HasColumnName("total_price");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(20)
                .HasDefaultValueSql("'tobefilled'")
                .HasColumnName("transaction_id");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("fk_orders_customerid");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderitemId).HasName("PRIMARY");

            entity.ToTable("order_items");

            entity.HasIndex(e => e.OrderId, "fk_orderitem_orderid_idx");

            entity.HasIndex(e => e.TiffinId, "fk_orderitem_tiffinid_idx");

            entity.Property(e => e.OrderitemId).HasColumnName("orderitem_id");
            entity.Property(e => e.OrderId).HasColumnName("order_id");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Quantity)
                .HasDefaultValueSql("'1'")
                .HasColumnName("quantity");
            entity.Property(e => e.TiffinId).HasColumnName("tiffin_id");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("fk_orderitem_orderid");

            entity.HasOne(d => d.Tiffin).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.TiffinId)
                .HasConstraintName("fk_orderitem_tiffinid");
        });

        modelBuilder.Entity<Sample>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("sample");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Image)
                .HasColumnType("blob")
                .HasColumnName("image");
        });

        modelBuilder.Entity<SubscriptionPlan>(entity =>
        {
            entity.HasKey(e => e.PlanId).HasName("PRIMARY");

            entity.ToTable("subscription_plans");

            entity.HasIndex(e => e.Name, "name_UNIQUE").IsUnique();

            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(10)
                .HasColumnName("name");
            entity.Property(e => e.NoOfMeals).HasColumnName("no_of_meals");
            entity.Property(e => e.Price).HasColumnName("price");
        });

        modelBuilder.Entity<SubscriptionPurchase>(entity =>
        {
            entity.HasKey(e => e.PurchaseId).HasName("PRIMARY");

            entity.ToTable("subscription_purchases");

            entity.HasIndex(e => e.CustomerId, "fk_customerid_customers_idx");

            entity.HasIndex(e => e.PlanId, "fk_subpur_planid_idx");

            entity.Property(e => e.PurchaseId).HasColumnName("purchase_id");
            entity.Property(e => e.CustomerId).HasColumnName("customer_id");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValueSql("'active'")
                .HasColumnName("status");
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime")
                .HasColumnName("timestamp");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .HasDefaultValueSql("'tobefilled'")
                .HasColumnName("transaction_id");

            entity.HasOne(d => d.Plan).WithMany(p => p.SubscriptionPurchases)
                .HasForeignKey(d => d.PlanId)
                .HasConstraintName("fk_subpur_planid");
        });

        modelBuilder.Entity<Tiffin>(entity =>
        {
            entity.HasKey(e => e.TiffinId).HasName("PRIMARY");

            entity.ToTable("tiffins");

            entity.HasIndex(e => e.VendorId, "fk_tiffins_vendorid_idx");

            entity.HasIndex(e => e.TiffinId, "tiffin_id_UNIQUE").IsUnique();

            entity.Property(e => e.TiffinId).HasColumnName("tiffin_id");
            entity.Property(e => e.Description)
                .HasMaxLength(100)
                .HasColumnName("description");
            entity.Property(e => e.ImageLink)
                .HasMaxLength(500)
                .HasColumnName("image_link");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValueSql("'active'")
                .HasColumnName("status");
            entity.Property(e => e.TiffinCategory)
                .HasMaxLength(10)
                .HasColumnName("tiffin_category");
            entity.Property(e => e.TiffinName)
                .HasMaxLength(20)
                .HasColumnName("tiffin_name");
            entity.Property(e => e.TiffinPrice).HasColumnName("tiffin_price");
            entity.Property(e => e.VendorId).HasColumnName("vendor_id");

            entity.HasOne(d => d.Vendor).WithMany(p => p.Tiffins)
                .HasForeignKey(d => d.VendorId)
                .HasConstraintName("fk_tiffins_vendorid");
        });

        modelBuilder.Entity<Vendor>(entity =>
        {
            entity.HasKey(e => e.VendorId).HasName("PRIMARY");

            entity.ToTable("vendors");

            entity.HasIndex(e => e.Address, "address_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Email, "email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.MobNo, "mob_no_UNIQUE").IsUnique();

            entity.Property(e => e.VendorId).HasColumnName("vendor_id");
            entity.Property(e => e.ActiveStatus)
                .HasMaxLength(20)
                .HasDefaultValueSql("'inactive'")
                .HasColumnName("active_status");
            entity.Property(e => e.Address)
                .HasMaxLength(100)
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(45)
                .HasColumnName("email");
            entity.Property(e => e.MobNo)
                .HasMaxLength(13)
                .HasColumnName("mob_no");
            entity.Property(e => e.Name)
                .HasMaxLength(45)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.Pincode)
                .HasMaxLength(6)
                .HasColumnName("pincode");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValueSql("'pending'")
                .HasColumnName("status");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
