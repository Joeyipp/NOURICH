var foodFacts = [
    "The oldest evidence for soup is from 6,000 B.C. and calls for hippopotamus and sparrow meat.",
    "Pringles once had a lawsuit trying to prove that they weren't really potato chips.",
    "Pound cake got its name from its original recipe, which called for a pound each of butter, eggs, sugar, and flour.",
    "Ripe cranberries will bounce like rubber balls.",
    "An average ear of corn has an even number of rows, usually 16.",
    "Consuming dairy may cause acne.",
    "Most wasabi consumed is not real wasabi, but colored horseradish.",
    "Central Appalachia's tooth decay problem is referred to as Mountain Dew mouth, due to the beverage's popularity in the region.",
    "Apples belong to the rose family, as do pears and plums.",
    "Oklahoma's state vegetable is the watermelon.",
    "One of the most popular pizza toppings in Brazil is green peas.",
    "About 70% of olive oil being sold is not actually pure olive oil.",
    "Real aged balsamic vinegar actually costs anywhere from $75 to $400 or more.",
    "Store bought 100% 'real' orange juice is 100% artificially flavored.",
    "The most expensive pizza in the world costs $12,000 and takes 72 hours to make.",
    "The winner of the 2013 Nathan's Hot Dog Eating contest consumed 69 hot dogs in 10 minutes.",
    "The Dunkin' Donuts in South Korea offer doughnut flavors such as Kimchi Croquette and Glazed Garlic.",
    "Chocolate was once used as currency.",
    "There is an amusement park in Tokyo that offers Raw Horse Flesh-flavored ice cream.",
    "The tea bag was created by accident, as tea bags were originally sent as samples.",
    "A Cinnabon® Classic has less sugar than a 20-oz. bottle of Pepsi.",
    "Castoreum, which is used as vanilla flavoring in candies, baked goods, etc., is actually a secretion from the anal glands of beavers.",
    "Humans are born craving sugar.",
    "Radishes are members of the same family as cabbages.",
    "The red food-coloring carmine — used in Skittles and other candies — is made from boiled cochineal bugs, a type of beetle.",
    "Casu Marzu is a cheese found in Sardinia that is purposely infested with maggots.",
    "The softening agent L-cysteine — used in some bread — is made from human hair and duck feathers.",
    "The potentially fatal brain mushroom is considered a delicacy in Scandinavia, Eastern Europe, and the upper Great Lakes region of North America.",
    "If improperly prepared, fugu, or puffer fish, can kill you since it contains a toxin 1,200 times deadlier than cyanide.",
    "It is almost impossible to find out what all the ingredients are that Papa John's uses in its pizzas.",
    "Coconut water can be used as blood plasma.",
    "Milt, which is a delicacy around the world, is fish sperm.",
    "McDonald's sells 75 hamburgers every second of every day.",
    "Ranch dressing contains titanium dioxide, which is used to make it appear whiter. The same ingredient is used in sunscreen and paint for the same effect.",
    "Three plates of food at a Chinese buffet will net you about 3,000 calories.",
    "To make jelly beans shiny, shellac is used, which is made from Kerria lacca insect excretions.",
    "One fast food hamburger may contain meat from 100 different cows.",
    "Ketchup was used as a medicine in the 1800s to treat diarrhea, among other things.",
    "Fruit-flavored snacks are made with the same wax used on cars.",
    "Peanuts aren't nuts, they're legumes.",
    "No matter what color Fruit Loop you eat, they all taste the same.",
    "The most expensive fruit in the world is the Japanese Yubari cantaloupe, and two melons once sold at auction for $23,500.",
    "Arachibutyrophobia is the fear of peanut butter sticking to the roof of your mouth.",
    "When taken in large doses nutmeg works as a hallucinogen.",
    "Eating bananas can help fight depression.",
    "Canola oil was originally called rapeseed oil, but rechristened by the Canadian oil industry in 1978 to avoid negative connotations. 'Canola' is short for 'Canadian oil'.",
    "Honey is made from nectar and bee vomit.",
    "Yams and sweet potatoes are not the same thing.",
    "Chuck E. Cheese pizza restaurants were created by the inventor of the Atari video game system, Nolan Bushnell.",
    "The twists in pretzels are meant to look like arms crossed in prayer.",
    "'SPAM' is short for spiced ham.",
    "To add nutrition, a lot of milk, juice, and yogurts enrich the food with EPA and DHA omega-3 fatty acids. In other words, your OJ contains fish oil.",
    "There's an enzyme in pineapple called bromelain that helps to break down proteins and can also ruin your tastebuds.",
    "Apples float in water, because 25% of their volume is made of air.",
    "The popsicle was invented by an 11-year-old in 1905.",
    "Crackers, like Saltines, have small holes in them to prevent air bubbles from ruining the baking process.",
    "The reason why peppers taste hot is because of a chemical compound called capsaicin, which bonds to your sensory nerves and tricks them into thinking your mouth is actually being burned.",
    "One of the most hydrating foods to eat is the cucumber, which is 96% water.",
    "There are 7,500 varieties of apples grown throughout the world, and if you tried a new variety each day, it would take you 20 years to try them all.",
    "The most popular carrots used to be purple."
]

var getRandomFoodFact = () => {
    return new Promise((resolve, reject) => {
        var foodFact = foodFacts[Math.floor(Math.random()*foodFacts.length)];

        resolve({
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": foodFact
                            }
                        }
                        ],
                        "suggestion":{
                                "title": "More"
                        }
                    }
                }
            }
        });
    });
}

module.exports.getRandomFoodFact = getRandomFoodFact;