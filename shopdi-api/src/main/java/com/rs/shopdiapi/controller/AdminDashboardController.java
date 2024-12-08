package com.rs.shopdiapi.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.ui.Model;

@RestController
public class AdminDashboardController {
    // @GetMapping("/")
    // public String index() {
    // return "index";
    // }

    @GetMapping("/")
    public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		return "index";
	}
    // private final ResourceLoader resourceLoader;

    // public AdminDashboardController(ResourceLoader resourceLoader) {
    //     this.resourceLoader = resourceLoader;
    // }

    // @GetMapping("/classpath")
    // public void printClasspath() {
    //     String classpath = System.getProperty("java.class.path");
    //     System.out.println(classpath);

    // }
}
