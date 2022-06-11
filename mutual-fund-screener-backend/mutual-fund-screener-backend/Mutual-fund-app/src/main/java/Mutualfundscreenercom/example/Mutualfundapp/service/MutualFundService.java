package Mutualfundscreenercom.example.Mutualfundapp.service;

import Mutualfundscreenercom.example.Mutualfundapp.entities.MutualFund;
import Mutualfundscreenercom.example.Mutualfundapp.repository.MutualFundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class MutualFundService {
    @Autowired
    MutualFundRepository mutualFundRepository;

    
    @CacheEvict(value = "All-Mutual-fund-cache",key="'AllMutualFundCache'",beforeInvocation = true)
    @Cacheable(value="All-Mutual-fund-cache",key="'AllMutualFundCache'")
    public List<MutualFund> getAllMutualFundsService() {
        List<MutualFund> mutualFunds = new ArrayList<>();
        mutualFundRepository.findAll().iterator().forEachRemaining(mutualFunds::add);
        return addMutualFundIfActiveService(mutualFunds);
    }

    private List<MutualFund> addMutualFundIfActiveService(List<MutualFund> list) {
        List<MutualFund> result = new ArrayList<>();
        for (MutualFund mutualFund : list) {
            if (mutualFund.getIs_active()) {
                result.add(mutualFund);
            }
        }
        return result;
    }
    
    
    @CacheEvict(value = "Mutual-fund-cache",key="'MutualFundCache'+#mutualFundId",beforeInvocation = true)
    @Cacheable(value="Mutual-fund-cache",key="'MutualFundCache'+#mutualFundId")
    public ResponseEntity<?> getMutualFundService(Long mutualFundId) {
        if (mutualFundId == null) {
            return ResponseEntity.status(404).body("provide an ID");
        }
        if (!mutualFundRepository.existsById(mutualFundId)) {
            return ResponseEntity.status(404).body("This Mutual Fund does not exist");
        }
        MutualFund mutualFund = mutualFundRepository.getById(mutualFundId);
        if (!mutualFund.getIs_active()) {
            return ResponseEntity.status(404).body("This Mutual Fund does not exist");
        }
        return ResponseEntity.ok().body(mutualFund);

    }

    public ResponseEntity<?> addMutualFundService(MutualFund[] mutualFundArray) {
        if (mutualFundArray != null && mutualFundArray.length != 0) {
            for (MutualFund mutualFund : mutualFundArray) {
                mutualFundRepository.save(mutualFund);
            }
            return ResponseEntity.ok().body("Mutual Fund Added Successfully!");
        }
        return ResponseEntity.status(404).body("provide correct mutual fund details!");
    }

    public ResponseEntity<?> updateMutualFundService(MutualFund[] mutualFundArray) {
        if (mutualFundArray == null || mutualFundArray.length == 0) {
            return ResponseEntity.status(404).body("some thing wrong with mutual fund data provided!");
        }

        for(MutualFund mutualFund : mutualFundArray) {
            if (!mutualFundRepository.existsByName(mutualFund.getName())) {
                return ResponseEntity.status(404).body("request admin to add this Mutual Fund!");
            }
            MutualFund fetchMutualFund = mutualFundRepository.getByName(mutualFund.getName());
            if (!fetchMutualFund.getIs_active()) {
                return ResponseEntity.status(404).body("request admin to add this Mutual Fund!");
            }
            mutualFund.setId(fetchMutualFund.getId());
            mutualFundRepository.save(mutualFund);
        }
        return ResponseEntity.ok().body("Mutual Fund Updated Successfully!");
    }

    public ResponseEntity<?> deleteMutualFundService(Long mutualFundId) {
        if (!mutualFundRepository.existsById(mutualFundId)) {
            return ResponseEntity.status(404).body("Mutual fund does not exist!");
        }
        MutualFund mutualFund = mutualFundRepository.getById(mutualFundId);
        if (!mutualFund.getIs_active()) {
            return ResponseEntity.status(404).body("Mutual fund does not exist!");
        }
        mutualFund.setIs_active(false);
        mutualFundRepository.save(mutualFund);
        return ResponseEntity.ok().body("Mutual fund: " + mutualFund.getName() + " deleted!");
    }
}
