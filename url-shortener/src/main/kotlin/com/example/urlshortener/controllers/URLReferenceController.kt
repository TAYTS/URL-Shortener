package com.example.urlshortener.controllers

import com.example.urlshortener.entities.URLReference
import com.example.urlshortener.services.URLReferenceService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.media.ArraySchema
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.hibernate.validator.constraints.URL
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid
import javax.validation.constraints.NotBlank


@RestController
@RequestMapping("/url")
class URLReferenceController(private val urlReferenceService: URLReferenceService) {

    @Operation(summary = "Get all the URL reference")
    @ApiResponses(
        ApiResponse(
            responseCode = "200",
            description = "URL references found",
            content = [
                Content(
                    array = (ArraySchema(schema = Schema(implementation = URLReference::class)))
                )
            ]
        ),
    )
    @GetMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getAllURLReference(): Collection<URLReference> = urlReferenceService.getAllURLReferenceByCreatedAtDesc()

    @Operation(summary = "Get URL reference by URL hash")
    @ApiResponses(
        ApiResponse(
            responseCode = "201",
            description = "URL reference found",
            content = [
                Content(schema = Schema(implementation = URLReference::class))
            ]
        ),
        ApiResponse(responseCode = "404", description = "Invalid URL hash provided", content = [Content()])
    )
    @GetMapping("/{urlHash}", produces = [MediaType.APPLICATION_JSON_VALUE])
    fun getURLReference(@PathVariable urlHash: String): URLReference? =
        urlReferenceService.getURLReference(urlHash = urlHash) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Invalid URL hash provided"
        )

    @Operation(summary = "Create URL reference")
    @ApiResponses(
        ApiResponse(
            responseCode = "201",
            description = "URL reference created",
            content = [
                Content(schema = Schema(implementation = URLReference::class))
            ]
        ),
    )
    @PostMapping(produces = [MediaType.APPLICATION_JSON_VALUE])
    @ResponseStatus(HttpStatus.CREATED)
    fun createURLReference(@RequestBody @Valid request: URLRequest) =
        urlReferenceService.createURLReference(url = request.url)
}

data class URLRequest(
    @field:NotBlank(message = "Must not be blank")
    @field:URL(message = "Invalid URL")
    val url: String
)
