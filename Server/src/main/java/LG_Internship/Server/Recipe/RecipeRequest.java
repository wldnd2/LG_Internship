package LG_Internship.Server.Recipe;

import lombok.*;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecipeRequest {
    private long deviceId;
    private boolean apple;
    private boolean banana;
    private boolean broccoli ;
    private boolean carrot;
    private boolean orange;
    private boolean onion;
    private boolean pepper;
    private boolean sweetPotato;
    private boolean aubergine;
    private boolean beanSprouts;
    private boolean cabbage;
}
