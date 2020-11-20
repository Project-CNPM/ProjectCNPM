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

import com.javaweb.newswebsite.api.output.CmtOutput;
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
	
	@GetMapping(value = "/comment")
	public CmtOutput showUser(@RequestParam("page") int page, @RequestParam("limit") int limit,
			@RequestParam(name = "sortBy", required = false, defaultValue = "ASC") String sortBy,
			@RequestParam(name = "sortName", required = false, defaultValue = "content") String sortName,
			@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
			HttpServletRequest request) {
		CmtOutput cmtOutput = new CmtOutput();
		cmtOutput.setPage(page);
		cmtOutput.setSortName(sortName);
		cmtOutput.setSortBy(sortBy);
		Pageable pageable;
		if (sortBy.equals("ASC")) {
			pageable = PageRequest.of(page - 1, limit, Sort.by(cmtOutput.getSortName()).ascending());
		} else {
			pageable = PageRequest.of(page - 1, limit, Sort.by(cmtOutput.getSortName()).descending());
		}
		if(keyword.equals("")) {
			cmtOutput.setListCmt(cmtService.findAll(pageable));
		}
		else {
			cmtOutput.setListCmt(cmtService.findByKeyWord(keyword,pageable));
		}
		Math.ceil((double) cmtOutput.getTotalUser() / limit);
		return cmtOutput;
	}
	
	@GetMapping(value = "/comment/{id}")
	    public CmtDTO getEmployeeById(@PathVariable("id") Long id) {
		return cmtService.findById(id);
	}
}
