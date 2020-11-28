package com.javaweb.newswebsite.api.output;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.javaweb.newswebsite.dto.NewDTO;

public class AddNews {
	 @PostMapping(value = "/new")
	    public ResponseEntity<NewDTO> createNew(@RequestBody NewDTO model) {

	        return new ResponseEntity<>(newService.save(model), HttpStatus.CREATED);
	    }
}
