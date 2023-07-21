package LG_Internship.Server.Recipe_Ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredientEntity, Long> {
//    List<RecipeIngredientEntity> findByIngredientsList_Id(Long ingredientId);
}
