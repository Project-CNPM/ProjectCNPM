package com.javaweb.newswebsite.service;

import com.javaweb.newswebsite.dto.CategoryDTO;

public interface ICategoryService {
	CategoryDTO save(CategoryDTO categoryDto);
	void delete(Long[] ids);

}
