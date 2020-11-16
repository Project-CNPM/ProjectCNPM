package com.javaweb.newswebsite.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.newswebsite.dto.CmtChildDTO;
import com.javaweb.newswebsite.service.ICmtChildService;
@CrossOrigin
@RestController
public class CmtChildAPI {
	@Autowired
	private ICmtChildService cmtChildService;
	
	@PostMapping(value = "/commentChild")
	public CmtChildDTO createNew(@RequestBody CmtChildDTO model) {
		return cmtChildService.save(model);
	}

	@PutMapping(value = "/commentChild/{id}")
	public CmtChildDTO updateNew(@RequestBody CmtChildDTO model, @PathVariable("id") long id) {
		model.setId(id);
		return cmtChildService.save(model);
	}

	@DeleteMapping(value = "/commentChild")
	public void deleteNew(@RequestBody long[] ids) {
		cmtChildService.delete(ids);
	}
}
