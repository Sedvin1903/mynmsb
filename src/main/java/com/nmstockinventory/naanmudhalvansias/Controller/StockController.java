package com.nmstockinventory.naanmudhalvansias.Controller;

import com.nmstockinventory.naanmudhalvansias.Entity.Stock;
import com.nmstockinventory.naanmudhalvansias.Service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping(value = "/save")
    private String saveStocks(@RequestBody Stock stocks){

        stockService.saveorUpdate(stocks);
        return stocks.getItemId().toString();
    }

    @GetMapping(value = "/getAll")
    private Iterable<Stock>getStocks(){
        return stockService.listAll();
    }

    @PutMapping(value = "/edit/{id}")
    private Stock update(@RequestBody Stock stock,@PathVariable(name = "id")String _id){

        stock.setItemId(_id);
        stockService.saveorUpdate(stock);
        return stock;
    }

    @DeleteMapping(value = "/delete/{id}")
    private void deleteStock(@PathVariable(name = "id") String _id){
        stockService.deleteStock(_id);
    }

    @GetMapping(value = "/search/{id}")
    private Stock getStock(@PathVariable(name = "id") String stockId) {
        return stockService.getStockById(stockId);
    }
}
