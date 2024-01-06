package com.test.sdp_webgame;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;

import java.util.UUID;

public class Tests {
	public WebDriver driver; 
	public String username, password, email;
	
	@BeforeTest
	public void setup() {
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
		
		String temp = UUID.randomUUID().toString(); 
		this.username = "test-" + temp;
		this.email = this.username + "@gmail.com";
		this.password = username;
	}
	
	@AfterTest
	public void cleanup() {
		driver.quit();
	}
	
	
	@Test(description="Test buka websitenya", priority=-99)
	public void testOpenLink() throws Exception {
		driver.get("https://sdp-webgame-mgoa5nyvlq-et.a.run.app");
		try {
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/a")));
			driver.manage().window().maximize();
			Thread.sleep(3000);
			Assert.assertEquals(driver.getTitle(), "SDP WebGame");
		}
		catch(Exception e) {
			Assert.fail("Timeout fail");
		}
	}

	
//	@Test(description="Test register user (semua field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"})
//	public void testUserRegisterFail_1() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//								
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//					
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//					
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				signUp.click();
//				
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				Thread.sleep(3000);
//				
//				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
//			}
//			catch(Exception e) {
//				Assert.fail(e.getMessage());
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test register user (2 field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"} )
//	public void testUserRegisterFail_2() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//				
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//				
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//				
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				Thread.sleep(1000);
//				// username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				Thread.sleep(1000);
//				signUp.click();
//				
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				Thread.sleep(3000);
//				
//				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
//			}
//			catch(Exception e) {
//				Assert.fail(e.getMessage());
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test register user (1 field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"})
//	public void testUserRegisterFail_3() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//				
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//				
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//				
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				
//				// username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				// email
//				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
//				
//				signUp.click();
//				
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				Thread.sleep(3000);
//				
//				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
//			}
//			catch(Exception e) {
//				Assert.fail(e.getMessage());
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test register user (sukses)", priority=1 , dependsOnMethods = {"testOpenLink"})
//	public void testUserRegisterSuccess() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//				
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//				
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//				
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				
//				// username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				// email
//				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
//				// password
//				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//				Thread.sleep(1000);
//				signUp.click();
//
//				Thread.sleep(1000);
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				
//				Assert.assertEquals(message.getText(), "Berhasil register");
//			}
//			catch(Exception e) {
//				Assert.fail(e.getMessage());
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//
//	@Test(description="Test register user (Username telah terpakai)", priority=2, dependsOnMethods = {"testOpenLink"})
//	public void testUserRegisterFail_0_1() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//				
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//				
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//				
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				
//				// username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				// email
//				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
//				// password
//				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//				
//				signUp.click();
//				Thread.sleep(3000);
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				Thread.sleep(3000);
//				
//		}
//	}
//	
//	@Test(description="Test register user (Email telah terpakai)", priority=2, dependsOnMethods = {"testUserRegisterSuccess"})
//	public void testUserRegisterFail_0_2() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			try {
//				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
//				
//				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
//				registerNav.click();
//				
//				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
//				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
//				
//				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
//				
//				// username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys("testestest");
//				// email
//				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
//				// password
//				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//				
//				signUp.click();
//				Thread.sleep(1000);
//				
//				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
//				
//				Thread.sleep(1000);
//				
//				Assert.assertEquals(message.getText(), "Email telah terpakai");
//			}
//			catch(Exception e) {
//				Assert.fail(e.getMessage());
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test login user (semua field kosong)", priority=5 , dependsOnMethods = {"testOpenLink"})
//	public void testUserLoginFail_1() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			
//			Thread.sleep(1000);
//			
//			//login button click
//			driver.findElement(By.xpath("//button[text()='Log In']")).click();
//			
//			Thread.sleep(3000);
//			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
//			Assert.assertEquals(msg.getText(), "Semua Field Wajib diisi!");
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test login user (username tidak ada)", priority=5 , dependsOnMethods = {"testOpenLink"})
//	public void testUserLoginFail_2() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			Thread.sleep(1000);
//
//			//username
//			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("USER DOESN'T EXIST");
//			//password
//			driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//			//login button click
//			driver.findElement(By.xpath("//button[text()='Log In']")).click();
//			
//			Thread.sleep(3000);
//
//			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
//			Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test login user (password salah)", priority=5, dependsOnMethods = {"testUserRegisterSuccess"})
//	public void testUserLoginFail_3() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			Thread.sleep(1000);
//
//			//username
//			driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//			//password
//			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("Password salah");
//			//login button click
//			driver.findElement(By.xpath("//button[text()='Log In']")).click();
//			
//			Thread.sleep(3000);
//
//			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
//			Assert.assertEquals(msg.getText(), "Password salah!");
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test login user (sukses)", priority=6 , dependsOnMethods = {"testUserRegisterSuccess"})
//	public void testUserLoginSuccess() throws Exception {
//		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//		if(loginNav.getText().equals("Login")) {
//			loginNav.click();
//			Thread.sleep(1000);
//
//			//username
//			driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//			//password
//			driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//			//login button click
//			driver.findElement(By.xpath("//button[text()='Log In']")).click();
//			
//			Thread.sleep(3000);
//			
//			try {
//				
//				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
//				Assert.assertEquals(msg.getText(), this.username);
//			}
//			catch(Exception e) {
//				Assert.fail("Login failed");
//			}
//		}
//		else {
//			Assert.fail("Login button not found");
//		}
//	}
//	
//	@Test(description="Test logout user", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
//	public void testUserLogout() throws Exception {
//		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//		if(settingsNav.getText().equals("Setting")) {
//			settingsNav.click();
//			Thread.sleep(1000);
//
//			
//			var logoutButton = driver.findElement(By.xpath("//button[text()='Log Out']"));
//			logoutButton.click();
//			
//			Thread.sleep(3000);
//			
//			try {
//				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/a"));
//				Assert.assertEquals(msg.getText(), "WebGame SDP");
//			}
//			catch(Exception e) {
//				Assert.fail("Logout failed");
//			}
//		}
//		else {
//			Assert.fail("Setting button not found");
//		}
//	}
//	
//	@Test(description="Test delete account user", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
//	public void testUserDeleteAccount() throws Exception {
//		WebElement settingsNav = null;
//		try {
//			settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//		}
//		catch(Exception e) {
//			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//			if(loginNav.getText().equals("Login")) {
//				loginNav.click();
//				Thread.sleep(1000);
//
//				//username
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
//				//password
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("test");
//				//login button click
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
//				
//				Thread.sleep(3000);
//				
//				try {
//					settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//				}
//				catch(Exception e2) {
//					Assert.fail("Login failed");
//				}
//			}
//			else {
//				Assert.fail("Login button not found");
//			}
//		}
//		if(settingsNav.getText().equals("Setting")) {
//			settingsNav.click();
//			Thread.sleep(1000);
//
//			
//			var logoutButton = driver.findElement(By.xpath("//button[text()='Delete Account']"));
//			logoutButton.click();
//			
//			Thread.sleep(3000);
//			
//			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//			if(loginNav.getText().equals("Login")) {
//				loginNav.click();
//				Thread.sleep(1000);
//
//				//username
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
//				//password
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("test");
//				//login button click
//				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
//				
//				Thread.sleep(3000);
//				
//				var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/h6[3]"));
//				Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
//			}
//			else {
//				Assert.fail("Login button not found after deleting account");
//			}
//		}
//		else {
//			Assert.fail("Setting button not found");
//		}
//	}
	
//	@Test(description="Test Edit Account User", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
//	public void testUserEditAccountUsername() throws Exception {
//		WebElement settingsNav = null;
//		try {
//			settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//		}
//		catch(Exception e) {
//			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//			if(loginNav.getText().equals("Login")) {
//				loginNav.click();
//				Thread.sleep(1000);
//
//				//username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				//password
//				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//				//login button click
//				driver.findElement(By.xpath("//button[text()='Log In']")).click();
//				
//				Thread.sleep(3000);
//				
//				try {
//					settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//				}
//				catch(Exception e2) {
//					Assert.fail("Login failed");
//				}
//			}
//			else {
//				Assert.fail("Login button not found");
//			}
//		}
//		
//		if(settingsNav.getText().equals("Setting")) {
//			settingsNav.click();
//			Thread.sleep(1000);
//
//			
//			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
//		    editButton.click();
//			
//			Thread.sleep(1000);
//			
//		    // Wait for the form to be visible
//		    WebElement form = driver.findElement(By.xpath("//form[@class='mt-8 mb-2 w-1/2']"));
//		    Thread.sleep(1000);
//		    // Locate the input fields and change values
//		    WebElement usernameInput = form.findElement(By.name("username"));
//		    WebElement emailInput = form.findElement(By.name("email"));
//		    WebElement passwordInput = form.findElement(By.name("password"));
//
//		    usernameInput.clear();
//		    usernameInput.sendKeys("newUsername");
//		    Thread.sleep(1000);
//
//		    emailInput.clear();
//		    emailInput.sendKeys("newemail@example.com");
//		    Thread.sleep(1000);
//
//		    passwordInput.clear();
//		    passwordInput.sendKeys("newpassword");
//		    Thread.sleep(1000);
//
//		    // Locate and click the "Edit Account" button
//		    WebElement saveButton = form.findElement(By.xpath("//button[text()='Save Changes']"));
//		    saveButton.click();
//		}
//
//	}	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// ADMIN !!!!!
	
	@Test(description="Test login admin (sukses)", priority=1 , dependsOnMethods = {"testOpenLink"})
	public void testAdminLoginSuccess() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("admin");
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("admin");
			
			Thread.sleep(3000);
			//login button click
			driver.findElement(By.xpath("//button[text()='Log In']")).click();
			
			Thread.sleep(3000);
			
			try {
				
				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
				Assert.assertEquals(msg.getText(), "admin");
			}
			catch(Exception e) {
				Assert.fail("Login failed");
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
//	@Test(description="Test Admin Privacy Policy Button click", priority=6 , dependsOnMethods = {"testAdminLoginSuccess"})
//	public void clickPrivacyPolicyButton() throws Exception {
//		try {
//			// Assuming the Privacy Policy button has the text "Privacy Policy"
//			driver.findElement(By.xpath("//button[text()='Privacy Policy']")).click();
//	        Thread.sleep(10000);
//	        
//	        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//	        WebElement dialog = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='grid place-items-center fixed w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm']")));
//	        
//	        WebElement confirmButton = driver.findElement(By.xpath("//button[contains(span, 'Confirm')]"));
//	        confirmButton.click();
//	        Thread.sleep(3000);
//	        // Add assertions or additional actions after clicking the button if needed
//	    } catch (Exception e) {
//	        Assert.fail("Failed to click the Privacy Policy button");
//	    }
//	}
//	
//	@Test(description="Test Admin Term & Condition Button click", priority=6, dependsOnMethods = {"testAdminLoginSuccess"})
//	public void clickTermConditionButton() throws Exception {
//	    try {
//	        // Assuming the "Term & Condition" button has the text "Term & Condition"
//	        WebElement termConditionButton = driver.findElement(By.xpath("//button[text()='Term & Condition']"));
//	        termConditionButton.click();
//	        Thread.sleep(3000);
//	        
//	        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
//	        WebElement dialog = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='grid place-items-center fixed w-screen h-screen bg-black bg-opacity-60 backdrop-blur-sm']")));
//	        
//	        WebElement confirmButton = dialog.findElement(By.xpath("//button[contains(span, 'Confirm')]"));
//	        confirmButton.click();
//	        Thread.sleep(3000);
//
//	        // Add assertions or additional actions after clicking the "Term & Condition" button if needed
//	    } catch (Exception e) {
//	        Assert.fail("Failed to click the Term & Condition button");
//	    }
//	}

	
	@Test(description="Test click Users tab", priority=2 , dependsOnMethods = {"testAdminLoginSuccess"})
	public void testListUserTab() throws Exception {
		var usersNav = driver.findElement(By.xpath("//a[text()='Users']"));
		if(usersNav.getText().equals("Users")) {
			usersNav.click();
            Thread.sleep(1000);

            // Locate the ul element
            WebElement tabList = driver.findElement(By.cssSelector("ul[role='tablist']"));

            // Iterate through each li element and click
            for (WebElement tab : tabList.findElements(By.cssSelector("li[role='tab']"))) {
                tab.click();
                
                // Wait for 2 seconds before clicking the "Next" button
                Thread.sleep(5000);

                // Click the "Next" button
                WebElement nextButton = driver.findElement(By.xpath("//button[text()='Next']"));
                while (!isNextButtonDisabled()) {
                    nextButton.click();

                    // Wait for 5 seconds before the next click
                    Thread.sleep(1000);
                }
                // Wait for 5 seconds before the next click
                Thread.sleep(5000);
            }

            Thread.sleep(3000);

            try {
                var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
                Assert.assertEquals(msg.getText(), "admin");
            } catch(Exception e) {
                Assert.fail("Login failed");
            }
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	private boolean isNextButtonDisabled() {
	    try {
	        WebElement nextButton = driver.findElement(By.xpath("//button[text()='Next']"));
	        return nextButton.getAttribute("disabled") != null;
	    } catch (Exception e) {
	        e.printStackTrace();
	        Assert.fail("Failed to check the 'Next' button state");
	        return false;
	    }
	}
	
	@Test(description="Test click News tab", priority=3 , dependsOnMethods = {"testAdminLoginSuccess"})
	public void testNewTabsAdmi() throws Exception {
		var usersNav = driver.findElement(By.xpath("//a[text()='News']"));
		if(usersNav.getText().equals("News")) {
			usersNav.click();
            Thread.sleep(1000);
            
            JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
            for (int i = 0; i < 10; i++) {  // Adjust the loop count for the desired scroll length
                jsExecutor.executeScript("window.scrollBy(0, 50);");
                Thread.sleep(500);  // Adjust the sleep duration for the desired scroll speed
            }
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test click Users tab", priority=4 , dependsOnMethods = {"testAdminLoginSuccess"})
	public void testBugsTab() throws Exception {
		var usersNav = driver.findElement(By.xpath("//a[text()='Bugs']"));
		if(usersNav.getText().equals("Bugs")) {
			usersNav.click();
            Thread.sleep(1000);

            // Locate the ul element
            WebElement tabList = driver.findElement(By.cssSelector("ul[role='tablist']"));

            // Iterate through each li element and click
            for (WebElement tab : tabList.findElements(By.cssSelector("li[role='tab']"))) {
                tab.click();
                
                // Wait for 2 seconds before clicking the "Next" button
                Thread.sleep(5000);

                // Click the "Next" button
                WebElement nextButton = driver.findElement(By.xpath("//button[text()='Next']"));
                while (!isNextButtonDisabled()) {
                    nextButton.click();

                    // Wait for 5 seconds before the next click
                    Thread.sleep(1000);
                }
                // Wait for 5 seconds before the next click
                Thread.sleep(5000);
            }

            Thread.sleep(3000);

            try {
                var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
                Assert.assertEquals(msg.getText(), "admin");
            } catch(Exception e) {
                Assert.fail("Login failed");
            }
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test logout Admin", priority=5, dependsOnMethods = {"testAdminLoginSuccess"})
	public void testAdminLogout() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			
			var logoutButton = driver.findElement(By.xpath("//button[text()='Log Out']"));
			logoutButton.click();
			
			Thread.sleep(3000);
			
			try {
				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/a"));
				Assert.assertEquals(msg.getText(), "WebGame SDP");
			}
			catch(Exception e) {
				Assert.fail("Logout failed");
			}
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	
	
	
//	@Test(description="Test Edit Account User", priority=6, dependsOnMethods = {"testAdminLoginSuccess"})
//	public void testUserEditAccountUsername() throws Exception {
//		WebElement settingsNav = null;
//		try {
//			settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//		}
//		catch(Exception e) {
//			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
//			if(loginNav.getText().equals("Login")) {
//				loginNav.click();
//				Thread.sleep(1000);
//
//				//username
//				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
//				//password
//				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
//				//login button click
//				driver.findElement(By.xpath("//button[text()='Log In']")).click();
//				
//				Thread.sleep(3000);
//				
//				try {
//					settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
//				}
//				catch(Exception e2) {
//					Assert.fail("Login failed");
//				}
//			}
//			else {
//				Assert.fail("Login button not found");
//			}
//		}
//		
//		if(settingsNav.getText().equals("Setting")) {
//			settingsNav.click();
//			Thread.sleep(1000);
//
//			
//			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
//		    editButton.click();
//			
//			Thread.sleep(1000);
//			
//		    // Wait for the form to be visible
//		    WebElement form = driver.findElement(By.xpath("//form[@class='mt-8 mb-2 w-1/2']"));
//		    Thread.sleep(1000);
//		    // Locate the input fields and change values
//		    WebElement usernameInput = form.findElement(By.name("username"));
//		    WebElement emailInput = form.findElement(By.name("email"));
//		    WebElement passwordInput = form.findElement(By.name("password"));
//
//		    usernameInput.clear();
//		    usernameInput.sendKeys("newUsername");
//		    Thread.sleep(1000);
//
//		    emailInput.clear();
//		    emailInput.sendKeys("newemail@example.com");
//		    Thread.sleep(1000);
//
//		    passwordInput.clear();
//		    passwordInput.sendKeys("newpassword");
//		    Thread.sleep(1000);
//
//		    // Locate and click the "Edit Account" button
//		    WebElement saveButton = form.findElement(By.xpath("//button[text()='Save Changes']"));
//		    saveButton.click();
//		}
//
//	}
	
}
