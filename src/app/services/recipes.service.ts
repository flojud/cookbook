import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  categories : string[] = [
    "Hauptgericht", "Nachtisch"
  ]

  recipes : Recipe[] = [
    {
      id: 1,
      name: "Afrikanische Hähnchenkeulen",
      category: "Hauptgericht",
      ingredients: "5	Knoblauchzehe(n) 2	Zitrone(n), evtl. mehr 4	Hähnchenkeule(n) ½ kg	Kartoffel(n), festkochende, geschält 3	Zwiebel(n) 1	Chilischote(n) 2 TL	Salz ½ TL	Paprikapulver, edelsüß ½ TL	Zimtpulver ½ TL	Korianderpulver ½ TL	Kreuzkümmel, gemahlen 2 EL	Öl 125 ml	Hühnerbrühe 125 ml	Wermut",
      description: "Für die Marinade die Schale von einer gewaschenen Zitrone abreiben und den Saft von 1 - 2 Zitronen auspressen (eine Zitrone für später aufheben). Wenn man die Hähnchenkeulen in der Zitronenmarinade einen Tag lang mariniert, kann man auch 3 - 4 Zitronen nehmen, denn bei dem chemischen Prozess verliert sich die Säure, bei kürzerer Marinierdauer ist weniger besser. Den Knoblauch fein schneiden und mit einem Teelöffel Salz zu einer Paste zerdrücken, Die Kerne der Chilischote entfernen, die Chilischote klein schneiden. Alles zusammen mischen und eine Stunde stehen lassen. Für die Gewürzmischung einen Teelöffel Salz mit Paprika, Zimt, Koriander und Kreuzkümmel vermengen. Wem die Gewürzmischung zu aufwändig ist, der kann auch ein fertiges Hähnchengewürz verwenden, dann einfach noch den Zimt dazugeben. Die Haut der Hähnchenkeulen vorsichtig anheben, das Fleisch darunter mit dem Großteil der Gewürzmischung einreiben, die Haut anschließend wieder über das Fleisch ziehen. Das gibt ein wunderbar würziges Fleisch. Ein Backblech mit Öl einpinseln, die Keulen mit der Hautseite nach oben aufs Blech legen und großzügig mit der Marinade übergießen. Kartoffeln und Zwiebeln mit aufs Blech legen und mit der restlichen Gewürzmischung bestreuen. Wermut und Brühe angießen. Wer keinen Alkohol verwenden will, der kann den Wermut durch Brühe ersetzen. Bei 180 Grad 40 - 50 Minuten braten. Die übrige Zitrone in Scheiben schneiden und zum Schluss auf Fleisch und Kartoffeln verteilen. Wer will, kann auch noch anderes Gemüse mit aufs Blech geben. Geprüft und für sehr lecker befunden sind Hokkaidokürbis, Tomaten und grüne Bohnen. Dazu kann man Baguette reichen, aber durch die Kartoffeln ist es eigentlich ein komplettes Essen. Auch für Gäste geeignet, weil es bei niedriger Hitze auch ein paar Minuten länger im Ofen bleiben kann.",
      url : "https://www.chefkoch.de/rezepte/1521751257407008/Afrikanische-Haehnchenkeulen.html",
      image : "https://img.chefkoch-cdn.de/rezepte/1521751257407008/bilder/1315511/crop-600x400/afrikanische-haehnchenkeulen.jpg"
    },
    {
      id: 2,
      name: "Toskanischer Hähnchen-Auflauf",
      category: "Hauptgericht",
      ingredients: "500 g	Hähnchenbrustfilet(s) 800 g	Kartoffel(n), kleine 1 große	Zwiebel(n) 2 Zehe/n	Knoblauch 3	Tomate(n) 3 Zweig/e	Rosmarin 1 Zweig/e	Thymian ¼ Liter	Hühnerbrühe",
      description: "Die ersten sechs Zutaten für die Marinade mischen und die gewaschenen und getrockneten Hähnchenfilets hineinlegen. Mindestens 1 Std. darin marinieren (geht auch über Nacht). Kartoffeln schälen, größere Knollen halbieren und in Olivenöl ca. 10 Min. von allen Seiten braun braten. Die gebratenen Kartoffeln in eine mit Olivenöl ausgestrichene Auflaufform geben. Knoblauch schälen und klein hacken. Die Zwiebel schälen, halbieren und die Hälften in Ringe schneiden. 1 Zweig Thymian und 1 Zweig Rosmarin waschen und hacken. Zwiebeln, Knoblauch und gehackte Kräuter im Bratfett andünsten, dann über die Kartoffeln geben. Das Fleisch mit der Marinade auf die Kartoffeln geben und alles im Backofen bei 200 Grad ca. 15 Min. braten. Dann heiße Hühnerbrühe angießen, die Tomaten und zwei Rosmarinzweige im Auflauf verteilen und weitere 30 Min. im Ofen garen.",
      url : "https://www.chefkoch.de/rezepte/472271140790423/Toskanischer-Haehnchen-Auflauf.html",
      image : "https://img.chefkoch-cdn.de/rezepte/472271140790423/bilder/1327537/crop-600x400/toskanischer-haehnchen-auflauf.jpg"
    }
    
  ];

  getRecipes():Recipe[] {
    return this.recipes;
  }
  
  deleteRecipe(recipe: Recipe): void {
    this.recipes = this.recipes.filter(a => a != recipe);
  }

  addRecipe(newRecipe: Recipe): void{
    newRecipe.id = this.getLastRecipeId() +1;
    this.recipes.push(newRecipe);
  }

  getLastRecipeId(): number {
    var last_recipe = this.recipes[this.recipes.length - 1];
    return last_recipe.id;
  }
  getCategories(): string[] {
    return this.categories;
  }
}
