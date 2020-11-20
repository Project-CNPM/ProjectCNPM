package com.javaweb.newswebsite.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.javaweb.newswebsite.dto.CmtChildDTO;

public interface ICmtChildService {
	CmtChildDTO save(CmtChildDTO cmtChildDTO);
	void delete(long[] ids);
	CmtChildDTO findById(Long id);
	List<CmtChildDTO> findAll(Pageable pageable);
	int totalUser();
	List<CmtChildDTO> findByKeyWord(String keyword, Pageable pageable);
}
