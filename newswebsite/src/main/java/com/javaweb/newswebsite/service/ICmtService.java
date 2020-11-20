package com.javaweb.newswebsite.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.javaweb.newswebsite.dto.CmtDTO;

public interface ICmtService {
	CmtDTO save(CmtDTO cmtDTO);
	void delete(long[] ids);
	CmtDTO findById(Long id);
	List<CmtDTO> findAll(Pageable pageable);
	int totalUser();
	List<CmtDTO> findByKeyWord(String keyword, Pageable pageable);
}
