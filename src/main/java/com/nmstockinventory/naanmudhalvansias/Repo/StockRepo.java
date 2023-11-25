package com.nmstockinventory.naanmudhalvansias.Repo;

import com.nmstockinventory.naanmudhalvansias.Entity.Stock;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StockRepo extends MongoRepository<Stock,String> {


}
