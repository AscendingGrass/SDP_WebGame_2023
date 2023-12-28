package com.test.sdp_webgame;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
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
				
				Assert.assertTrue(message.getText().isBlank());
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
				
				Assert.assertTrue(message.getText().isBlank());
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
				
				Assert.assertTrue(message.getText().isBlank());
			}
			catch(Exception e) {
				Assert.fail(e.getMessage());
			}
		}
		else {
			Assert.fail("Login button not found");
		}
	}
	
	@Test(description="Test register user (sukses)", priority=1)
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

	@Test(description="Test register user (Username telah terpakai)", priority=2)
	public void testUserRegisterFail_0() throws Exception {
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
}
