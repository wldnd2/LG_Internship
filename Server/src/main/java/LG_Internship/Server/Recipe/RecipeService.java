package LG_Internship.Server.Recipe;


import LG_Internship.Server.Ingredient.IngredientEntity;
import LG_Internship.Server.Ingredient.IngredientRepository;
import LG_Internship.Server.Recipe_Ingredient.RecipeIngredientEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    public List<RecipeDTO> getRecipe(RecipeRequest recipeRequest){

        Field[] fields = RecipeRequest.class.getDeclaredFields();
//        List<RecipeIngredientEntity> recipeIngredients = null;
//
//        for (int i = 0; i < fields.length; i++){
//            try {
//                fields[i].setAccessible(true);
//                if(fields[i].getType() == boolean.class && fields[i].getBoolean(recipeRequest) == true){
//                    if( recipeIngredients == null ){
//                        recipeIngredients = ingredientRepository.findByName(fields[i].getName()).getRecipeIngredientList();
//                        log.info("recipeIngredients : " + recipeIngredients);
//                        continue;
//                    }
//                    List<RecipeIngredientEntity> Filter = ingredientRepository.findByName(fields[i].getName()).getRecipeIngredientList();
////                    log.info("msg + " + Filter);
////                    recipeIngredients.retainAll(Filter);
//                    log.info("recipeIngredients : " + Filter);
//                }
//            } catch (IllegalAccessException e) {
//                throw new RuntimeException(e);
//            }
//        }
        List<RecipeEntity> recipes = recipeRepository.findAll();
        List<Integer> deleteIndex = new ArrayList<>();

        for(Field field : fields){
            try {
                field.setAccessible(true);
                if(field.getType() == boolean.class && field.getBoolean(recipeRequest) == true){

                    for(int recipeIndex = 0; recipeIndex < recipes.size(); recipeIndex++){
                        RecipeEntity recipe = recipes.get(recipeIndex);
                        List<RecipeIngredientEntity> ingredients = recipe.getRecipeIngredientList();
                        boolean exist = false;

                        // Check ingredients
                        for(int ingredientIndex = 0; ingredientIndex < ingredients.size(); ingredientIndex++){
                            IngredientEntity ingredient = ingredients.get(ingredientIndex).getIngredient();
                            if( ingredient.getName().equals(field.getName()) ){
                                exist = true;
                                log.info("recipe : " + recipe.getRecipeId() + "  exist : " + exist);
                                break;
                            }
                        }
                        if(exist == false){
                            log.info("recipe : " + recipe.getRecipeId() + "   exist : " + exist);
                            deleteIndex.add(recipeIndex);
                        }
                    }
                    Collections.sort(deleteIndex, Collections.reverseOrder());
                    for (int index : deleteIndex){
                        log.info("delete index : " + index);
                        recipes.remove(index);
                    }
                    deleteIndex.clear();
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        List<RecipeDTO> recipeDTOS = new ArrayList<>();
        for( RecipeEntity recipe : recipes){
            recipeDTOS.add(new RecipeDTO(recipe.getRecipeName(),
                    recipe.getRecipeDescription(),
                    recipe.getRecipeUrl(),
                    recipe.getRecipePhoto()));
        }
         return recipeDTOS;
    }
}
