package com.marketplace.HappyMart.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    public Cart() {
    }

    public Cart(User user) {
        this.user = user;
        this.totalPrice = 0;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
        updateTotalPrice();
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void updateTotalPrice() {
        this.totalPrice = items.stream().mapToInt(CartItem::getPrice).sum();
    }

    public void addItem(CartItem item) {
        items.add(item);
        item.setCart(this);
        updateTotalPrice();
    }

    public void removeItem(CartItem item) {
        items.remove(item);
        updateTotalPrice();
    }
}
