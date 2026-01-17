import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

public class rai {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        
        System.out.println("Do you want to play the game?");
        String answer = in.nextLine();
        
        if (answer.equalsIgnoreCase("yes")) {
            System.out.println("Great! Let's start.");
            playGame(in);
        } else {
            System.out.println("Okay, maybe next time.");
        }
        
        in.close();
    }
    
    public static void playGame(Scanner in) {
        System.out.println("Playing the game...");
        
        System.out.println("Did you win? (yes/no)");
        String result = in.nextLine();
        
        if (result.equalsIgnoreCase("yes")) {
            String praise = getRandomPraise();
            System.out.println("\n🎉 " + praise);
            System.out.println("\nMoving to next level...");
        } else {
            String roast = getRandomRoast();
            System.out.println("\n😅 " + roast);
        }
    }
    
    public static String getRandomPraise() {
        String[] praises = {
            "ABSOLUTELY LEGENDARY! You're crushing it like a pro! Keep this momentum!",
            "WOW! That was FIRE! You just dominated that level like it was nothing!",
            "UNSTOPPABLE! You're on a roll! That victory was smooth as butter!",
            "BOOM! Victory is yours! You played that perfectly. Nothing can stop you!",
            "You just DEMOLISHED that level! Your skills are unmatched! Next level awaits!",
            "FLAWLESS VICTORY! That was too easy for you! You're a natural!",
            "INSANE PLAY! You made that look effortless! Champions are made like this!",
            "GODLIKE! That performance was next level! You're built different!"
        };
        return praises[new java.util.Random().nextInt(praises.length)];
    }
    
    public static String getRandomRoast() {
        String[] roasts = {
            "Oof! Even my grandma plays better, and she doesn't know what a controller is! 😂",
            "Did you just lose to a tutorial level? Come on, you got this... eventually!",
            "L + ratio + skill issue 💀 But hey, everyone starts somewhere. Round 2?",
            "Yikes! That performance was more tragic than my code at 3 AM!",
            "Bro really thought they were gonna win 😭 It's okay, failure builds character!",
            "That was almost as bad as my WiFi connection. Almost. Wanna redeem yourself?",
            "The game really said 'not today' huh? 💀 But we believe in comebacks!",
            "POV: You just got absolutely destroyed. But losers can become winners!",
            "My calculator could've played that better! 😅 But second chances exist!",
            "That was... something. By something I mean a disaster 😂 Run it back!"
        };
        return roasts[new java.util.Random().nextInt(roasts.length)];
    }
}