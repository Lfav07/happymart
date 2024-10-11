package com.marketplace.HappyMart.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PRODUCT")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "image")
    private String image;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = false)
    private Category category;


    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private int price;

    // in grams
    @Column(name = "weight")
    private int weight;

    @Column(name = "description")
    private String description;

    public Product() {
    }

    public Product(String company, String name, String image, Category category, int quantity, int price, int weight, String description) {
        this.company = company;
        this.name = name;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.weight = weight;
        this.description = description;

    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getCompany() {
        return company;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", company='" + company + '\'' +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", category=" + category +
                ", quantity=" + quantity +
                ", price=" + price +
                ", weight=" + weight +
                ", description='" + description + '\'' +
                '}';
    }

    public void setCompany(String company) {
        this.company = company;
    }


}
