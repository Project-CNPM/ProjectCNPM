package com.javaweb.newswebsite.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.newswebsite.dto.CategoryDTO;
import com.javaweb.newswebsite.service.ICategoryService;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryAPI {
	
	@Autowired
	private ICategoryService categoryService;

	@PostMapping(value = "/category")
	public CategoryDTO createCatergory(@RequestBody CategoryDTO model) {
		return categoryService.save(model);
	}
	
	  @DeleteMapping(value = "/category")
	    public ResponseEntity<?> deleteCategory(@RequestBody Long[] ids) {
	       categoryService.delete(ids);
	        return new ResponseEntity<>(HttpStatus.OK);
	    }
	  
	  @PutMapping(value = "/category/{id}")
		public CategoryDTO updateCategory(@RequestBody CategoryDTO model, @PathVariable("id") long id) {
			model.setId(id);
			return categoryService.save(model);
	  
}
}