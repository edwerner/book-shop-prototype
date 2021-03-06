package react.app.server.orders;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductsRepository extends JpaRepository<Product, String>  {
	
}