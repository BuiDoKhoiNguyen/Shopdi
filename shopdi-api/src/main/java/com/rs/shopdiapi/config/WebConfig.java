package com.rs.shopdiapi.config;

import java.io.IOException;
import java.net.http.HttpRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("classpath:/static/dist/");
        resolver.setSuffix(".html");
        return resolver;
    }

    @Value("classpath:/dist/index.html")
    private Resource indexHtml;

    // @Override
    // public void addViewControllers(ViewControllerRegistry registry) {
    // registry.addViewController("/").setViewName("forward:/dist/index.html");
    // }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/dist/", "classpath:/static/")
                .setCachePeriod(3600)
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        System.out.println("resourcePath: " + resourcePath);
                        if (resourcePath.equals("/")) {
                            return new ClassPathResource("static/dist/index.html");
                        }
                        Resource resource = location.createRelative(resourcePath);
                        System.out.println("resource: " + resource.getURI());
                        return resource.exists() && resource.isReadable() ? resource
                                : new ClassPathResource("static/dist/index.html");
                    }
                });
        registry.addResourceHandler("/dist/**")
                .addResourceLocations("classpath:/dist/");
    }

    // @Bean
    // public ResourceHttpRequestHandler resourceHttpRequestHandler() {
    // return new ResourceHttpRequestHandler() {
    // @Override
    // protected Resource getResource(HttpServletRequest request) throws IOException
    // {
    // return new ClassPathResource("dist/index.html");
    // }
    // };
    // }
}