import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  CreateProductBody,
  Productservice,
  UpdateProductBody,
} from './products.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('products')
export class ProductController {
  constructor(private productservice: Productservice) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  @UseGuards(AuthGuard)
  get(@Request() req) {
    const user = req.user
    return this.productservice.get(user.sub)
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard)
  getOne(@Param('id') id: string) {
    return this.productservice.getOne(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('')
  @UseGuards(AuthGuard)
  create(@Request() req, @Body() body: CreateProductBody) {
    const user = req.user
    return this.productservice.create(user.sub, body)
  }

  @HttpCode(HttpStatus.OK)
  @Put('')
  @UseGuards(AuthGuard)
  update(@Request() req, @Body() body: UpdateProductBody) {
    const user = req.user
    return this.productservice.update(user.sub, body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Request() req, @Param('id') id: string) {
    const user = req.user
    return this.productservice.delete(id)
  }
}
