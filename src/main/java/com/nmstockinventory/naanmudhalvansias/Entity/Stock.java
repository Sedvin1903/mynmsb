package com.nmstockinventory.naanmudhalvansias.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "stock")
public class Stock {

    @Id
    private String itemId;
    private String stockName;
    private Double stockPrice;
    private Integer stockQuantity;
    private Double stockAmt;
    private String stockSupplier;
    private Date orderCompletionDate;
    private String status;

    public Stock(String itemId, String stockName, Double stockPrice, Integer stockQuantity, Double stockAmt, String stockSupplier, Date orderCompletionDate, String status) {
        this.itemId = itemId;
        this.stockName = stockName;
        this.stockPrice = stockPrice;
        this.stockQuantity = stockQuantity;
        this.stockAmt = stockAmt;
        this.stockSupplier = stockSupplier;
        this.orderCompletionDate = orderCompletionDate;
        this.status = status;
    }

    public Stock() {
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Double getStockAmt() {
        return stockAmt;
    }

    public void setStockAmt(Double stockAmt) {
        this.stockAmt = stockAmt;
    }

    public String getStockSupplier() {
        return stockSupplier;
    }

    public void setStockSupplier(String stockSupplier) {
        this.stockSupplier = stockSupplier;
    }

    public Date getOrderCompletionDate() {
        return orderCompletionDate;
    }

    public void setOrderCompletionDate(Date orderCompletionDate) {
        this.orderCompletionDate = orderCompletionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "itemId=" + itemId +
                ", stockName='" + stockName + '\'' +
                ", stockPrice=" + stockPrice +
                ", stockQuantity=" + stockQuantity +
                ", stockAmt=" + stockAmt +
                ", stockSupplier='" + stockSupplier + '\'' +
                ", orderCompletionDate=" + orderCompletionDate +
                ", status='" + status + '\'' +
                '}';
    }
}
