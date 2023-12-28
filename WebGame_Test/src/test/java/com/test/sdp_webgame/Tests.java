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
	
	@Test(description="Test buka websitenya")
	public void testOpenLink() throws Exception {
		driver.get("https://sdp-webgame-mgoa5nyvlq-et.a.run.app");
		try {
			WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/html/body/div[1]/div/div[1]/div/div[1]/a")));
			Assert.assertEquals(driver.getTitle(), "SDP WebGame");
		}
		catch(Exception e) {
			Assert.fail("Timeout fail");
		}
	}

}
