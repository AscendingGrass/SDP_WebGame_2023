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

	
	@Test(description="Test register user (semua field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"})
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
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (2 field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"} )
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
				Thread.sleep(1000);
				// username
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				Thread.sleep(1000);
				signUp.click();
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (1 field kosong)", priority=1 , dependsOnMethods = {"testOpenLink"})
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
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				// email
				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
				
				signUp.click();
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
				Thread.sleep(3000);
				
				Assert.assertEquals(message.getText(), "Semua field wajib diisi!");
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
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				// email
				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
				// password
				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
				Thread.sleep(1000);
				signUp.click();

				Thread.sleep(1000);
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
				
				Assert.assertEquals(message.getText(), "Berhasil register");
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}

	@Test(description="Test register user (Username telah terpakai)", priority=2, dependsOnMethods = {"testOpenLink"})
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
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				// email
				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
				// password
				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
				
				signUp.click();
				Thread.sleep(3000);
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
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
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys("testestest");
				// email
				driver.findElement(By.xpath("//input[@name='email']")).sendKeys(this.email);
				// password
				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
				
				signUp.click();
				Thread.sleep(1000);
				
				var message = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/form/div[2]/div"));
				
				Thread.sleep(1000);
				
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
	
	@Test(description="Test login user (semua field kosong)", priority=5 , dependsOnMethods = {"testOpenLink"})
	public void testUserLoginFail_1() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			
			Thread.sleep(1000);
			
			//login button click
			driver.findElement(By.xpath("//button[text()='Log In']")).click();
			
			Thread.sleep(3000);
			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
			Assert.assertEquals(msg.getText(), "Semua Field Wajib diisi!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (username tidak ada)", priority=5 , dependsOnMethods = {"testOpenLink"})
	public void testUserLoginFail_2() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("USER DOESN'T EXIST");
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
			//login button click
			driver.findElement(By.xpath("//button[text()='Log In']")).click();
			
			Thread.sleep(3000);

			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
			Assert.assertEquals(msg.getText(), "User tidak terdaftar!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (password salah)", priority=5, dependsOnMethods = {"testUserRegisterSuccess"})
	public void testUserLoginFail_3() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("Password salah");
			//login button click
			driver.findElement(By.xpath("//button[text()='Log In']")).click();
			
			Thread.sleep(3000);

			var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
			Assert.assertEquals(msg.getText(), "Password salah!");
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test login user (sukses)", priority=6 , dependsOnMethods = {"testUserRegisterSuccess"})
	public void testUserLoginSuccess() throws Exception {
		var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
		if(loginNav.getText().equals("Login")) {
			loginNav.click();
			Thread.sleep(1000);

			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
			//login button click
			driver.findElement(By.xpath("//button[text()='Log In']")).click();
			
			Thread.sleep(3000);
			
			try {
				
				var msg = driver.findElement(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/div[1]/a[2]"));
				Assert.assertEquals(msg.getText(), this.username);
			}
			catch(Exception e) {
				Assert.fail("Login failed");
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	@Test(description="Test edit 1 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditUsername() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("test1");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg = driver.findElement(By.xpath("//input[@name='username']"));
				Assert.assertEquals(msg.getAttribute("value"), this.username + "test1");
			}
			catch(Exception e) {
				Assert.fail("username tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	@Test(description="Test edit 1 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditEmail() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//email
			driver.findElement(By.xpath("//input[@name='email']")).sendKeys("test1");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg = driver.findElement(By.xpath("//input[@name='email']"));
				Assert.assertEquals(msg.getAttribute("value"), this.email + "test1");
			}
			catch(Exception e) {
				Assert.fail("email tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	@Test(description="Test edit 1 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditPassword() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("test1");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg = driver.findElement(By.xpath("//input[@name='password']"));
				Assert.assertEquals(msg.getAttribute("value"), this.password + "test1");
			}
			catch(Exception e) {
				Assert.fail("password tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	@Test(description="Test edit 2 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditUsernameEmail() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("test2");
			//email
			driver.findElement(By.xpath("//input[@name='email']")).sendKeys("test2");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg1 = driver.findElement(By.xpath("//input[@name='username']"));
				Assert.assertEquals(msg1.getAttribute("value"), this.username + "test2");
				
				var msg2 = driver.findElement(By.xpath("//input[@name='email']"));
				Assert.assertEquals(msg2.getAttribute("value"), this.email + "test2");
			}
			catch(Exception e) {
				Assert.fail("username atau email tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	
	@Test(description="Test edit 2 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditUsernamePassword() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("test2");
			//email
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("test2");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg1 = driver.findElement(By.xpath("//input[@name='username']"));
				Assert.assertEquals(msg1.getAttribute("value"), this.username + "test2");
				
				var msg2 = driver.findElement(By.xpath("//input[@name='password']"));
				Assert.assertEquals(msg2.getAttribute("value"), this.password + "test2");
			}
			catch(Exception e) {
				Assert.fail("username atau email tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
		}
	}
	
	@Test(description="Test edit 3 field", priority=6, dependsOnMethods = {"testUserLoginSuccess"})
	public void testEditUsernameEmailPassword() throws Exception {
		var settingsNav = driver.findElement(By.xpath("//a[text()='Setting']"));
		if(settingsNav.getText().equals("Setting")) {
			settingsNav.click();
			Thread.sleep(1000);

			//edit button click
			var editButton = driver.findElement(By.xpath("//button[text()='Edit Account']"));
			editButton.click();
			
			Thread.sleep(1000);
			
			//username
			driver.findElement(By.xpath("//input[@name='username']")).sendKeys("test3");
			//email
			driver.findElement(By.xpath("//input[@name='email']")).sendKeys("test3");
			//password
			driver.findElement(By.xpath("//input[@name='password']")).sendKeys("test3");
			//save button click
			driver.findElement(By.xpath("//button[text()='Save Changes']")).click();
			
			var HomeNav = driver.findElement(By.xpath("//a[text()='Home']"));
			HomeNav.click();
			
			Thread.sleep(1000);
			
			settingsNav.click();
			
			Thread.sleep(1000);
			
			try {
				
				var msg1 = driver.findElement(By.xpath("//input[@name='username']"));
				Assert.assertEquals(msg1.getAttribute("value"), this.username + "test3");
				
				var msg2 = driver.findElement(By.xpath("//input[@name='password']"));
				Assert.assertEquals(msg2.getAttribute("value"), this.password + "test3");
				
				var msg3 = driver.findElement(By.xpath("//input[@name='email']"));
				Assert.assertEquals(msg3.getAttribute("value"), this.email + "test3");
			}
			catch(Exception e) {
				Assert.fail("username,email, atau password tidak ter save");		
			}
			
		}
		else {
			Assert.fail("Setting button not found");
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
	
	@Test(description="Test delete account user", priority=10, dependsOnMethods = {"testUserLogout"})
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
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				//password
				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
				//login button click
				driver.findElement(By.xpath("//button[text()='Log In']")).click();
				
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

			
			var deleteButton = driver.findElement(By.xpath("//button[text()='Delete Account']"));
			deleteButton.click();
			Thread.sleep(1000);
			var confirmButton = driver.findElement(By.xpath("/html/body/div[4]/div/div/div/div[3]/button[2]"));
			confirmButton.click();
			
			Thread.sleep(1000);
			
			var loginNav = driver.findElement(By.xpath("//a[text()='Login']"));
			if(loginNav.getText().equals("Login")) {
				loginNav.click();
				Thread.sleep(1000);

				//username
				driver.findElement(By.xpath("//input[@name='username']")).sendKeys(this.username);
				//password
				driver.findElement(By.xpath("//input[@name='password']")).sendKeys(this.password);
				//login button click
				driver.findElement(By.xpath("//button[text()='Log In']")).click();
				
				Thread.sleep(1000);
				
				var msg = driver.findElement(By.xpath("/html/body/div/div/div[2]/div/div/div/form/div[3]/div"));
				Assert.assertEquals(msg.getText(), "Akun sudah dihapus!");
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
