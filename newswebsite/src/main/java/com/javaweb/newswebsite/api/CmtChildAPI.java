package com.javaweb.newswebsite.api;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.javaweb.newswebsite.api.output.CmtChildOutput;
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
	
	@GetMapping(value = "/commentChild")
	public CmtChildOutput showUser(@RequestParam("page") int page, @RequestParam("limit") int limit,
			@RequestParam(name = "sortBy", required = false, defaultValue = "ASC") String sortBy,
			@RequestParam(name = "sortName", required = false, defaultValue = "content") String sortName,
			@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
			HttpServletRequest request) {
		CmtChildOutput cmtChildOutput = new CmtChildOutput();
		cmtChildOutput.setPage(page);
		cmtChildOutput.setSortName(sortName);
		cmtChildOutput.setSortBy(sortBy);
		Pageable pageable;
		if (sortBy.equals("ASC")) {
			pageable = PageRequest.of(page - 1, limit, Sort.by(cmtChildOutput.getSortName()).ascending());
		} else {
			pageable = PageRequest.of(page - 1, limit, Sort.by(cmtChildOutput.getSortName()).descending());
		}
		if(keyword.equals("")) {
			cmtChildOutput.setListCmtChild(cmtChildService.findAll(pageable));
		}
		else {
			cmtChildOutput.setListCmtChild(cmtChildService.findByKeyWord(keyword,pageable));
		}
		Math.ceil((double) cmtChildOutput.getTotalUser() / limit);
		return cmtChildOutput;
	}
	
	@GetMapping(value = "/commentChild/{id}")
	    public CmtChildDTO getEmployeeById(@PathVariable("id") Long id) {
		return cmtChildService.findById(id);
	}
}
