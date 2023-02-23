package lk.ijse.spring.repo;

import lk.ijse.spring.entity.Customer;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepo {
    Optional<Customer> findCustomerByUsername(String username);

    Optional<Customer> findCustomerByPassword(String password);

    Optional<Customer> findCustomerByUsernameAndPassword(String username, String password);

    @Query(value = "SELECT customerId FROM Customer ORDER BY customerId DESC LIMIT 1", nativeQuery = true)
    String generateCustomerId();

}
