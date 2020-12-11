package com.example.urlshortener.controllers

import com.example.urlshortener.services.URLReferenceService
import org.hibernate.validator.constraints.URL
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid
import javax.validation.constraints.NotBlank


@RestController
@RequestMapping("/url")
class URLReferenceController(private val urlReferenceService: URLReferenceService) {

    @GetMapping("/{urlHash}")
    @ResponseStatus(HttpStatus.OK)
    fun getURLReference(@PathVariable urlHash: String) =
        urlReferenceService.getURLReference(urlHash = urlHash) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Invalid URL hash provided"
        )

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun createURLReference(@RequestBody @Valid request: URLRequest) =
        urlReferenceService.createURLReference(url = request.url)
}

data class URLRequest(
    @field:NotBlank(message = "Must not be blank")
    @field:URL(message = "Invalid URL")
    val url: String
)
