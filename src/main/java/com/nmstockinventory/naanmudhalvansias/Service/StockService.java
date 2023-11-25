package com.nmstockinventory.naanmudhalvansias.Service;

import com.nmstockinventory.naanmudhalvansias.Entity.Stock;
import com.nmstockinventory.naanmudhalvansias.Repo.StockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepo repo;

    public void saveorUpdate(Stock stock) {
        repo.save(stock);
    }

    public Iterable<Stock> listAll() {
        return repo.findAll();
    }

    public void deleteStock(String itemId) {
        repo.deleteById(itemId);
    }

    public Stock getStockById(String itemId) {
        return repo.findById(itemId).get();
    }
}
