package com.javaweb.newswebsite.service;

import com.javaweb.newswebsite.dto.CmtDTO;

public interface ICmtService {
	CmtDTO save(CmtDTO cmtDTO);
	void delete(long[] ids);
}
