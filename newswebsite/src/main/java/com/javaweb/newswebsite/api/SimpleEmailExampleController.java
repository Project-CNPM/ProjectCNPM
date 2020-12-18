package com.javaweb.newswebsite.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SimpleEmailExampleController {

    @Autowired
    public JavaMailSender emailSender;


    @PostMapping(value = "/sendEmail/{email}")
    public String sendSimpleEmail(@PathVariable("email")String email) {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Thông báo từ WORDTIME");
        message.setText("Chúc mừng bạn đã đăng ký nhận thông báo khi có tin tức mới từ WORDTIME thành công");
        // Send Message!
        this.emailSender.send(message);

        return "Email Sent!";
    }

    @PostMapping(value = "/hello")
    public String sendSimple1Email() {
        return "hello world";
    }


}