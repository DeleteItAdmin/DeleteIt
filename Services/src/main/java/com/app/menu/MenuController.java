package com.app.menu;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController {
	
	
@RequestMapping("/")
public @ResponseBody String test()
{
	return "Hello Services";
	}
}
