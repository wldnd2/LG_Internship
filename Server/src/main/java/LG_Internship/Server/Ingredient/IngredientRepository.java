package LG_Internship.Server.Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientEntity, Long> {
    public IngredientEntity findByName(String name);
}
