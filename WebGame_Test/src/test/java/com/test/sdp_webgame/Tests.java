package com.test.sdp_webgame;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;

public class Tests {
	public WebDriver driver; 
	
	@BeforeTest
	public void setup() {
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver();
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
	
	@Test(description="Test register user (semua field kosong)", priority=1)
	public void testUserRegisterFail_1() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				signUp.click();
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (2 field kosong)", priority=1)
	public void testUserRegisterFail_2() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				
				// username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[1]/input")).sendKeys("test");
				
				signUp.click();
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (1 field kosong)", priority=1)
	public void testUserRegisterFail_3() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				
				// username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[1]/input")).sendKeys("test");
				// email
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/input")).sendKeys("test@gmail.com");
				
				signUp.click();
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (sukses)", priority=1 , dependsOnMethods = {"testOpenLink"})
	public void testUserRegisterSuccess() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				
				// username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[1]/input")).sendKeys("test");
				// email
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/input")).sendKeys("test@gmail.com");
				// password
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[3]/input")).sendKeys("test");
				
				signUp.click();

				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Register berhasil");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}

	@Test(description="Test register user (Username telah terpakai)", priority=2, dependsOnMethods = {"testUserRegisterSuccess"})
	public void testUserRegisterFail_0_1() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				
				// username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[1]/input")).sendKeys("test");
				// email
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/input")).sendKeys("test@gmail.com");
				// password
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[3]/input")).sendKeys("test");
				
				signUp.click();

				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Username telah terpakai");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (Email telah terpakai)", priority=2, dependsOnMethods = {"testUserRegisterSuccess"})
	public void testUserRegisterFail_0_2() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			try {
				var waitRegister = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitRegister.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[text()='Register']")));
				
				var registerNav = driver.findElement(By.xpath("//a[text()='Register']"));
				registerNav.click();
				
				var waitSignUp = new WebDriverWait(driver, Duration.ofSeconds(20));
				waitSignUp.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='sign up']")));
				
				var signUp = driver.findElement(By.xpath("//button[text()='sign up']"));
				
				// username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[1]/input")).sendKeys("testestest");
				// email
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[2]/input")).sendKeys("test@gmail.com");
				// password
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/div/div[3]/input")).sendKeys("test");
				
				signUp.click();

				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/form/h6"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Email telah terpakai");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (semua field kosong)", priority=5)
	public void testUserLoginFail_1() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			
			Thread.sleep(1000);
			
			//login button click
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
			
			Thread.sleep(3000);
			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/h6[3]"));
			Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (username tidak ada)", priority=5)
	public void testUserLoginFail_2() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("USER DOESN'T EXIST");
			//password
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("password");
			//login button click
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
			
			Thread.sleep(3000);

			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/h6[3]"));
			Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (password salah)", priority=5)
	public void testUserLoginFail_3() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
			//password
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("password");
			//login button click
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
			
			Thread.sleep(3000);

			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/h6[3]"));
			Assert.assertEquals(msg.getText(), "Password salah!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (sukses)", priority=6, dependsOnMethods = {"testUserRegisterSuccess"})
	public void testUserLoginSuccess() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
			//password
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("test");
			//login button click
			driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
			
			Thread.sleep(3000);
			
			try {
				
				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
				Assert.assertEquals(msg.getText(), "test");
			}
			catch(Exception e) {
				Assert.fail("Login failed");
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test logout user", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testUserLogout() throws Exception {
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
	
	@Test(description="Test delete account user", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testUserDeleteAccount() throws Exception {
		WebElement settingsNav = null;
		try {
			settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		}
		catch(Exception e) {
			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
			if(loginNav.getText().equals("Login")) {
				loginNav.click();
				Thread.sleep(1000);

				//username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
				//password
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("test");
				//login button click
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
				
				Thread.sleep(3000);
				
				try {
					settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
				}
				catch(Exception e2) {
					Assert.fail("Login failed");
				}
			}
			else {
				Assert.fail("Login button not found");
			}
		}
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			
			var logoutButton = driver.findElement(By.xpath("//button[text()='Delete Account']"));
			logoutButton.click();
			
			Thread.sleep(3000);
			
			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
			if(loginNav.getText().equals("Login")) {
				loginNav.click();
				Thread.sleep(1000);

				//username
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[1]/input")).sendKeys("test");
				//password
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/input")).sendKeys("test");
				//login button click
				driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/button")).click();
				
				Thread.sleep(3000);
				
				var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/h6[3]"));
				Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
			}
			else {
				Assert.fail("Login button not found after deleting account");
			}
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	
	
}
