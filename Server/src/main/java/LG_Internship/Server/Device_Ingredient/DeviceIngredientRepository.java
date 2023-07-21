package LG_Internship.Server.Device_Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceIngredientRepository extends JpaRepository<DeviceIngredientEntity, Long> {
}
