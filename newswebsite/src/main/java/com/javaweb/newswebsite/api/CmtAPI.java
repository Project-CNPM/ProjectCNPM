package com.javaweb.newswebsite.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.newswebsite.dto.CmtDTO;
import com.javaweb.newswebsite.service.ICmtService;
@CrossOrigin
@RestController
public class CmtAPI {
	@Autowired
	private ICmtService cmtService;
	
	@PostMapping(value = "/comment")
	public CmtDTO createNew(@RequestBody CmtDTO model) {
		return cmtService.save(model);
	}

	@PutMapping(value = "/comment/{id}")
	public CmtDTO updateNew(@RequestBody CmtDTO model, @PathVariable("id") long id) {
		model.setId(id);
		return cmtService.save(model);
	}

	@DeleteMapping(value = "/comment")
	public void deleteNew(@RequestBody long[] ids) {
		cmtService.delete(ids);
	}
}
