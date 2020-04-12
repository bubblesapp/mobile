import org.bubblesapp.bubbles.MainActivity;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import androidx.test.espresso.action.ViewActions;
import androidx.test.rule.ActivityTestRule;
import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.locale.LocaleTestRule;

import static androidx.test.espresso.Espresso.pressBack;
import static androidx.test.espresso.Espresso.onView;
import static androidx.test.espresso.action.ViewActions.click;
import static androidx.test.espresso.assertion.ViewAssertions.matches;
import static androidx.test.espresso.matcher.ViewMatchers.isDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.isCompletelyDisplayed;
import static androidx.test.espresso.matcher.ViewMatchers.withContentDescription;
import static org.hamcrest.core.AllOf.allOf;

@RunWith(JUnit4.class)
public class ExampleInstrumentedTest {
    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityTestRule<MainActivity> activityRule = new ActivityTestRule<>(MainActivity.class);

    private String signIn = "Sign In";
    private String popButton = "Pop Bubble";
    private String confirmPopButton = "Proceed";
    private String resetBubble = "Reset Bubble";
    private String newInviteButton = "New Invite";
    private String profileTab = "Profile Tab";
    private String signOut = "Sign Out";

    @Test(timeout=40000)
    public void testTakeScreenshot() {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withContentDescription(signIn), isDisplayed()))
                .check(matches(isDisplayed()))
                .perform(click());

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Bubble");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withContentDescription(newInviteButton), isDisplayed()))
                .check(matches(isDisplayed()))
                .perform(click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Invite");

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        pressBack();

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withContentDescription(popButton), isDisplayed()))
                .check(matches(isDisplayed()))
                .perform(click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(withContentDescription(confirmPopButton))
                .check(matches(isDisplayed()))
                .perform(click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Popped");

        onView(withContentDescription(resetBubble))
                .perform(ViewActions.scrollTo(), click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withContentDescription(profileTab), isDisplayed()))
                .check(matches(isDisplayed()))
                .perform(click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(withContentDescription(signOut))
                .perform(ViewActions.scrollTo())
                .check(matches(isDisplayed()))
                .perform(click());
    }
}