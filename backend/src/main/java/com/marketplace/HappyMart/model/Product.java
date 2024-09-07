package com.marketplace.HappyMart.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCT")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    private Category category;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private int price;

    @Column(name = "weight")
    private int weight;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;


    public Product() {
    }

    public Product(String name, String image, Category category, int quantity, int price, int weight, String description, User customer) {
        this.name = name;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.weight = weight;
        this.description = description;
        this.customer = customer;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }
}
