package com.example.Pizza.Pratice.dto;

public class AdminDashboardResponse {

    private long totalCustomers;
    private long totalPizzas;
    private long totalOrders;
    private long totalPayments;
    private double totalRevenue;

    public AdminDashboardResponse() {
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalPizzas() {
        return totalPizzas;
    }

    public void setTotalPizzas(long totalPizzas) {
        this.totalPizzas = totalPizzas;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalPayments() {
        return totalPayments;
    }

    public void setTotalPayments(long totalPayments) {
        this.totalPayments = totalPayments;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}