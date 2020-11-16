package com.javaweb.newswebsite.service;

import com.javaweb.newswebsite.dto.CmtChildDTO;

public interface ICmtChildService {
	CmtChildDTO save(CmtChildDTO cmtChildDTO);
	void delete(long[] ids);
}
